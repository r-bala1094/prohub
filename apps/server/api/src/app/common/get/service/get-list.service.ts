import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import {
  Category,
  CategoryDocument,
  Deliverable,
  DeliverableDocument,
  Item,
  ItemDocument,
  Language,
  LanguageDocument,
  Subcategory,
  SubcategoryDocument,
} from '@prohub/database-schema';
import { Model } from 'mongoose';
import { Back4AppService } from '../../../services/back4app/back4app.service';
import {
  convertSearchQueryToUrlQuery,
  transformResponseOfPlaceSearch,
} from '@prohub/util';
import fetch from 'node-fetch';
@Injectable()
export class GetListService extends Back4AppService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Subcategory.name)
    private subcategoryModel: Model<SubcategoryDocument>,

    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(Deliverable.name)
    private deliverableModel: Model<DeliverableDocument>,
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
    private configService: ConfigService
  ) {
    super();
  }

  async getCategorieList(query: { search: string; limit: number }) {
    try {
      const { search, limit } = query;
      const result = await this.categoryModel.find(
        {
          category: new RegExp(search, 'i'),
        },
        {
          categoryId: '$_id',
          _id: 0,
          category: 1,
        }
      );

      // .exec();

      return result;
    } catch (err) {
      return [];
    }
  }

  async getSubcategorieList(query: {
    search: string;
    limit: number;
    categoryIds: Array<{ [key: string]: string }>;
  }) {
    const { search, limit, categoryIds = [] } = query;
    /** modify Array of categories string */
    try {
      const result = await this.subcategoryModel
        .find(
          {
            $and: [
              { $or: categoryIds },
              { subCategory: new RegExp(search, 'i') },
            ],
          },
          { subCategoryId: '$_id', categoryId: 1, subCategory: 1, _id: 0 }
        )
        .limit(+limit);

      return result;
    } catch (err) {
      console.log(err);
      /** */
    }
    console.log(query);
  }

  async getItemList(query: {
    search: string;
    limit: number;
    categoryIds: Array<{ [key: string]: string }>;
    subCategoryIds: Array<{ [key: string]: string }>;
  }) {
    const { search, limit, categoryIds = [], subCategoryIds = [] } = query;

    /** modify Array of categories string */
    try {
      const result = await this.itemModel
        .find(
          {
            $and: [
              { $or: [...categoryIds, ...subCategoryIds] },
              { skill: new RegExp(search, 'i') },
            ],
          },
          { skillId: '$_id', categoryId: 1, subCategoryId: 1, skill: 1, _id: 0 }
        )
        .limit(+limit);

      return result;
    } catch (err) {
      console.log(err);
      /** */
    }
  }

  async getDeliverableList(query: { search: string; limit: number }) {
    const { search, limit } = query;

    /** modify Array of categories string */
    try {
      const result = await this.deliverableModel
        .find(
          {
            deliverable: new RegExp(search, 'i'),
          },
          {
            deliverableId: '$_id',
            deliverable: 1,
            _id: 0,
          }
        )
        .limit(+limit);

      return result;
    } catch (err) {
      console.log(err);
      /** */
    }
  }

  async getLanguageList(query: {
    name: any;
    code: any;
    native: any;
    limit: number;
  }) {
    let { name = '', code = '', native = '' } = query || {};

    const { limit } = query;

    name = { $regex: name, $options: 'i' };
    code = { $regex: code, $options: 'i' };
    native = { $regex: native, $options: 'i' };

    try {
      return this.getLanguageFromBack4App(limit, { name, code, native });
    } catch (err) {
      return [];
    }
    // this.getLanguageFromBack4App()
    // const { search, limit } = query;

    // /** modify Array of categories string */
    // try {
    //   const result = await this.languageModel
    //     .find(
    //       {
    //         language: new RegExp(search, 'i'),
    //       },
    //       {
    //         languageId: '$_id',
    //         language: 1,
    //         _id: 0,
    //       }
    //     )
    //     .limit(+limit);

    //   return result;
    // } catch (err) {
    //   console.log(err);
    //   /** */
    // }
  }

  async getCountryList(query: {
    name: any;
    code: any;

    limit: number;
  }) {
    let { name, code } = query;

    name = { $regex: name, $options: 'i' };
    code = { $regex: code, $options: 'i' };
    const { limit } = query;

    try {
      return this.getCountryFromBack4App(
        limit,
        [{ name: name }, { code: code }],
        'name,emoji,code',
        ['objectId', 'code', 'name', 'emoji']
      );
    } catch (err) {
      return [];
    }
  }
  async getTimeZoneList(query: {
    TimeZone: any;
    CountryCode: any;

    limit: number;
  }) {
    let { TimeZone, CountryCode } = query;

    TimeZone = { $regex: TimeZone, $options: 'i' };
    CountryCode = { $regex: CountryCode, $options: 'i' };
    const { limit } = query;

    try {
      return this.getTimeZoneFromBack4App(+limit, { TimeZone, CountryCode });
    } catch (err) {
      return [];
    }
  }
  /**
   * for getting currency and phone list
   * @param query
   * @returns
   */
  async getCurrencyPhoneList(query: {
    name: any;
    currency: any;
    phone: any;
    limit: number;
  }) {
    let { name = '', currency = '', phone = '' } = query || {};

    name = { $regex: name, $options: 'i' };
    // code = { $regex: code, $options: 'i' };
    currency = { $regex: currency, $options: 'i' };
    phone = { $regex: phone, $options: 'i' };

    const { limit } = query || {};

    try {
      return this.getCountryFromBack4App(
        limit,
        [
          { name: name },
          // { code: code },
          { currency: currency },
          { phone: phone },
        ],
        'phone,currency,name,code',
        ['objectId', 'name', 'emoji', 'currency', 'phone']
      );
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  /************
   * for geting google location search Details
   */
  async getPlaceNameFromGooglePlaceSearch(rawSearchObj: {
    query: string;
    location?: string;
    radius?: number;
    type?: string;
  }): Promise<
    | Array<{
        fullAddress: string;
        location: { lat: number; lng: number };
        name: string;
        locationId: string;
      }>
    | []
  > {
    const searchString = convertSearchQueryToUrlQuery(rawSearchObj);
    console.log(searchString);

    try {
      const response = await fetch(
        `${this.configService.get(
          'GOOGLE_PLACE_SEARCH_URL'
        )}${searchString}&key=${this.configService.get(
          'GOOGLE_PLACE_SEARCH_API_KEY'
        )}`,
        { method: 'GET' }
      );
      // console.log(await response.json());
      return await transformResponseOfPlaceSearch(response.json());
    } catch (err) {
      throw [];
    }
  }

  /** transform text of place Search*/
}
