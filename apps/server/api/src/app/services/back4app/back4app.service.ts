import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
@Injectable()
export class Back4AppService {
  // constructor() {}

  async getLanguageFromBack4App(limit, query) {
    const where = encodeURIComponent(
      JSON.stringify({
        ...query,
      })
    );

    const response = await fetch(
      `https://parseapi.back4app.com/classes/Continentscountriescities_Language?limit=${limit}&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'y53vlWoqJxaFB7f877U3zIf8IzNyFyjEJ2XRXYvg', // This is your app's application id
          'X-Parse-REST-API-Key': 'IncmzAcrlDxWVohZvVpT0Gey0edBDWAxAhGmpTQX', // This is your app's REST API key
        },
      }
    );

    const data = await response.json(); // Here you have the data that you need
    if (data) {
      const { results } = data || {};

      return (results || []).map((accu) => {
        const { objectId, name, code, native } = accu;
        return {
          objectId,
          name,
          code,
          native,
        };
      });
    } else {
      return [];
    }
  }

  async getCountryFromBack4App(
    limit,
    query,
    keysName,
    filterOut: Array<string>
  ) {
    try {
      console.log('hello', keysName);
      const where = encodeURIComponent(
        JSON.stringify({
          $and: query,
        })
      );

      const response = await fetch(
        `https://parseapi.back4app.com/classes/Country?limit=${limit}&keys=${keysName}&where=${where}`,
        {
          headers: {
            'X-Parse-Application-Id':
              'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
            'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
          },
        }
      );
      const data = await response.json(); // Here you have the data that you need

      if (data) {
        const { results } = data;
        return (results || []).map((accu) => {
          const mapped = filterOut;

          const temp = {};
          mapped.forEach((elem) => {
            temp[elem] = accu[elem];
          });

          return temp;
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getTimeZoneFromBack4App(limit, query) {
    console.log(query);
    const where = encodeURIComponent(
      JSON.stringify({
        ...query,
      })
    );
    console.log(limit);
    const response = await fetch(
      `https://parseapi.back4app.com/classes/Timezone_Time_Zones_Dataset?limit=${limit}&where=${where}`,
      {
        headers: {
          'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
          'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
        },
      }
    );
    const data = await response.json(); // Here you have the data that you need

    if (data) {
      const { results } = data;
      return results || [];
    }
  }
}
