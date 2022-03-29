import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));


import productRoute from '../routes/product.route.js';
import accountRoute from '../routes/account.route.js';

export default function (app) {
  app.get('/', function (req, res) {
    // res.send('Hello World!');
    res.render('home');
  });


  app.get('/err', function(req,res){
      throw new Error('Error!');
  });


  app.use('/admin/product', productRoute);
  app.use('/account',accountRoute);

  app.use(function (req, res, next) {
    res.render('404', { layout: false });
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    // res.status(500).send('Something broke!')
    res.render('500', { layout: false });
  });

  
}

