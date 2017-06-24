

let categoryController = {
  getCategory: (req, res) => {
    res.render('category', {
      title: 'Category'
    })
  }

}
module.exports = categoryController
