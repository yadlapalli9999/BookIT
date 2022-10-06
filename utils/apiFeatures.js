class APIFeature {
   constructor(query,queryStr){
    this.query = query;
    this.queryStr = queryStr
   }

   search(){
     const location = this.queryStr.location ? {
        address:{
            $regex: this.queryStr.location,
            $options:'i'
        }
     }:{}
     console.log(location)
     this.query = this.query.find({...location})
     return this;
   }

   filter(){
    const queryCopy = {...this.queryStr};

    //remove fields from query
    const removeField = ['location']
    removeField.forEach(el=> delete queryCopy[el])

    this.query = this.query.find(queryCopy)
    return this;
   }
}


export default APIFeature;