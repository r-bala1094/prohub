// export const tranformQuery = (
//   Schema: any,
//   keyName: string,
//   oldKeyName: string
// ) => {
//   Schema.virtual(keyName).get(function () {
//     return ((this as unknown) as any)[oldKeyName];
//   });

//   Schema.set('toJSON', { virtuals: true });

//   Schema.set('toObject', { virtuals: true });

//   return Schema;
// };
