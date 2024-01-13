class APIFeatures{
    constructor(query,queryString){
      this.query=query
      this.queryString=queryString
    }
    filter(){
      let objectQuery={...this.queryString}
    const excludedFields=['page','sort','limit','fields']
    excludedFields.forEach(el=>delete objectQuery[el])
    let queryStr=JSON.stringify(objectQuery)
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)
    this.query.find(JSON.parse(queryStr))
    return this
    }
    sort(){
      if(this.queryString.sort){
        const querySort=this.queryString.sort.split(",").join(' ')
        console.log(querySort)
        this.query=this.query.sort(querySort)
      }
    
    
      else{
        this.query=this.query.sort("-createdAt")
      }
      return this
    }
    fields(){
      if(this.queryString.fields){
        const fields=this.queryString.fields.split(",").join(" ")
         this.query.select(fields)
       }
       return this
    }
    pagination(){
      const limit=this.queryString.limit*1 || 100
    const page= this.queryString.page*1 || 1
    const skip= (page-1)*limit
    this.query=this.query.skip(skip).limit(limit)
    return this
    }
  }
  module.exports=APIFeatures