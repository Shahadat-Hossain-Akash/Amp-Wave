class APIFilters{

    constructor(query, queryString){
        this.query = query
        this.queryString = queryString
    }

    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: 'i'
            }
        }:{}
        console.log(keyword)
        this.query = this.query.find({...keyword})
        return this
    }

    filter(){
        const queryCC = {...this.queryString}
        const removeFields = ['keyword', 'page']
        removeFields.forEach((s) => delete queryCC[s])

        let output={}
        let prop = ''

        for (let key in queryCC) {

            if(!key.match(/\b(gt|gte|lt|lte)/)){
                output[key]= queryCC[key]
            }
            else{
                prop = key.split('[')[0]

                let opt = key.match(/\[(.*)\]/)[1]

                if (!output[prop]){
                    output[prop]={}
                }

                output[prop][`$${opt}`] = queryCC[key]
            }



        }


        this.query = this.query.find(output)
        return this
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryString.page) || 1
        const skip = resPerPage * (currentPage-1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}
export default APIFilters;