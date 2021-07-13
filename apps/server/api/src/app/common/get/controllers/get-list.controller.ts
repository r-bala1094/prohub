import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtGaurdService } from '@prohub/database-core';
import { GetListService } from '../service/get-list.service';

@Controller('list')
export class GetListController {
  constructor(private getListService: GetListService) {}
  @UseGuards(JwtGaurdService)
  @Get('category')
  async getCategory(
    @Query() query: { where: { search: string; limit: number } }
  ) {
    try {
      const { where } = query;

      const category = await this.getListService.getCategorieList(where);

      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Category List fetched Successfully.',
          data: category,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Category List.',
          data: null,
        },
      };
    }
  }
  @UseGuards(JwtGaurdService)
  @Get('subcategory')
  async getSubcategory(
    @Query()
    query: {
      where: {
        search: string;
        limit: number;
        categoryIds: Array<{ [key: string]: string }>;
      };
    }
  ) {
    try {
      const { where } = query;
      const subCategory = await this.getListService.getSubcategorieList(where);
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Category List fetched Successfully.',
          data: subCategory,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Category List.',
          data: null,
        },
      };
    }
  }

  @UseGuards(JwtGaurdService)
  @Get('skills')
  async getItemList(
    @Query()
    query: {
      where: {
        search: string;
        limit: number;
        categoryIds: Array<{ [key: string]: string }>;
        subCategoryIds: Array<{ [key: string]: string }>;
      };
    }
  ) {
    try {
      const { where } = query;
      const subCategory = await this.getListService.getItemList(where);
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Subcategory List fetched Successfully.',
          data: subCategory,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Subcategory List.',
          data: null,
        },
      };
    }
  }

  @UseGuards(JwtGaurdService)
  @Get('deliverable')
  async getDeliverableList(
    @Query()
    query: {
      where: {
        search: string;
        limit: number;
      };
    }
  ) {
    try {
      const { where } = query;
      const deliverable = await this.getListService.getDeliverableList(where);
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Deliverable List fetched Successfully.',
          data: deliverable,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Deliverable List.',
          data: err,
        },
      };
    }
  }

  @UseGuards(JwtGaurdService)
  @Get('language')
  async getLanguageList(
    @Query()
    query: {
      where: {
        name: { $regex: string };
        code: { $regex: string };
        native: { $regex: string };
        limit: number;
      };
    }
  ) {
    try {
      const { where } = query;
      const language = await this.getListService.getLanguageList(where);
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Language List fetched Successfully.',
          data: language,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Language List.',
          data: err,
        },
      };
    }
  }
  //  @UseGuards(JwtGaurdService)
  @Get('country')
  async getCountryList(
    @Query()
    query: {
      where: {
        name: { $regex: string };
        code: { $regex: string };
        limit: number;
      };
    }
  ) {
    try {
      const { where } = query;
      const language = await this.getListService.getCountryList(where);
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Country List fetched Successfully.',
          data: language,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Country List.',
          data: err,
        },
      };
    }
  }

  @UseGuards(JwtGaurdService)
  @Get('timezone')
  async getTimeZoneList(
    @Query()
    query: {
      where: {
        TimeZone: { $regex: string };
        CountryCode: { $regex: string };
        limit: number;
      };
    }
  ) {
    try {
      const { where } = query;
      const language = await this.getListService.getTimeZoneList(where);
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Time Zone List fetched Successfully.',
          data: language,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Time Zone List.',
          data: err,
        },
      };
    }
  }

  @UseGuards(JwtGaurdService)
  @Get('currency-phone')
  async getCurrencyPhoneList(
    @Query()
    query: {
      where: {
        name: any;

        currency: any;
        phone: any;
        limit: number;
      };
    }
  ) {
    try {
      const { where } = query || {};
      const language = await this.getListService.getCurrencyPhoneList(where);
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Currency Phone List fetched Successfully.',
          data: language,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Currency Phone List.',
          data: err,
        },
      };
    }
  }
  /**
   *
   * @param query raw Text string
   * @returns object of Location only name and image url
   */
  @UseGuards(JwtGaurdService)
  @Get('location')
  async getLocationDetail(
    @Query()
    query: {
      where: {
        query: string;
        location?: string;
        radius?: number;
        type?: string;
      };
    }
  ) {
    try {
      const { where } = query || {};
      const location = await this.getListService.getPlaceNameFromGooglePlaceSearch(
        where
      );
      return {
        response: {
          status: true,
          statusCode: 200,
          message: 'Currency Phone List fetched Successfully.',
          data: location,
        },
      };
    } catch (err) {
      return {
        response: {
          status: false,
          statusCode: 404,
          message: 'Error in getting Currency Phone List.',
          data: err,
        },
      };
    }
  }
}
