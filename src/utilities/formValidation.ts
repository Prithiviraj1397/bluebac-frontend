export function formValid(data:any, errors:any) {
    let valid = true;
    errors && Object.values(errors).forEach((val: any) => {
      val.length > 0 && (valid = false);
    });
    data && Object.values(data).forEach((val) => {
      val === "" && (valid = false);
    });
    return valid;
  }


export function errorValid (data:any){
    let valid = true;
    data && Object.values(data).forEach((val:any) => {
      return val && Object.values(val).forEach((subVal:any) => {
        subVal.length === 0   && (valid = false);
      });
    });
    return valid;
}