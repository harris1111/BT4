import db from '../utils/db.js';

export default {
  findAll() {
    return db('products');
  },
  findByCatId(catId){
    return db('products').where('CatID',catId);
  },

  findPageByCatId(catId,limit,offset){
    return db('products').where('CatID',catId).limit(limit).offset(offset);
  },

  async countByCatId(catId){
    const list=await db('products').where('CatID',catId).count({amount:'ProID'});
    return list[0].amount;
  },
  async findById(id) {
    const list= await db('products').where('ProID', id);
    if (list.length === 0) 
       return null;
    return list[0];
  },

  add(entity) {
    return db('products').insert(entity);
  },
  del(id){
    return db('products').where('ProID',id).del();
  },
  patch(entity){
    const id=entity.ProID;
    delete entity.ProID;
    return db('products').where('ProID',id).update(entity);
  }
}
