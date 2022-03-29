import productModel from '../model/product.model.js';
import express from 'express';
const router = express.Router();
//app.use('/admin/product', productRoute);
router.get('/', async function (req, res) {
  const list = await productModel.findAll();
  res.render('vwProduct/index', {
    products: list
  });
});
  
router.get('/byCat/:id', async function (req, res) {
  // const catId=req.query.id || 0;
   const catId=req.params.id || 0;
   
  
    const limit=6;
    const page=req.query.page || 1;
    const offset=(page-1)*limit;
    const total= await productModel.countByCatId(catId);
    let nPages=Math.floor(total/limit);
    if(total%limit>0){
      nPages++;
    }
   const pageNumbers=[];
   for(let i=1;i<=nPages;i++){
      pageNumbers.push({
         value:i,
         isCurrent: +page===i
 
      });
   }
    
 
    const list= await productModel.findPageByCatId(catId,limit,offset);
   res.render('vwProduct/byCat', {
     products: list,
     empty: list.length===0,
     pageNumbers,
     pageNext: {
       page: +page + 1,
       isVisible: (+page === 1 && nPages === 1) ? false : (+page === nPages ? false : true),
   },
     pagePrev: {
       page: +page - 1,
       isVisible: (+page === 1) ? false : true,
   }
   });
 });
   
 

router.get('/add',(req,res) => {
    res.render('vwProduct/add');
  });
  
router.post('/add',async (req,res) => {
   const ret= await productModel.add(req.body);
   console.log(ret);
    res.render('vwProduct/add');
  });
router.get('/edit', async (req,res)=>{
  const id=req.query.id || 0;//khong truyen gi thi id tra ve gia tri 0
  const product= await productModel.findById(id);
  if(product === null){
    return res.redirect('/admin/product');
  }
 res.render('vwProduct/edit',{
    product
  });
});

router.post('/del',async (req,res) => {
  const ret= await productModel.del(req.body.ProID);
  console.log(ret);
   res.redirect('/admin/product');
 });

 router.post('/patch',async (req,res) => {
  const ret= await productModel.patch(req.body);
  console.log(ret);
   res.redirect('/admin/product');
 });
 

  export default router;