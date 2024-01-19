const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: 'starter/config.env' });
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on ${port}!...`);
});
