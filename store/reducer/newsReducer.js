


export const createNewsReduce = (state="please make body to do sometihgin", action) => {
    console.log('action.type', action.type)
    switch (action.type) {
      case 1:
       return "Body buring the caloreies";
      case 2:
       return "body taking calories";
      case 3:
       return  "body is in maintainence";
      case 4:
        return "Body is moderlty burning calories"
      default:
       return state;
    }
}