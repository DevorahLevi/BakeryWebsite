// Insert products by category into Main Page //

let categoryArray = ["pastries", "muffins"];
var categoryContainer = document.querySelector(".categoryContainer");

for (let i = 0; i < categoryArray.length; i++)
{
  let category = categoryArray[i];

  // Add Category Title to the Side Bar Pullout
  var sideBarContainer = document.querySelector(".sideBarCategoryContainer");
  var sideBarCategoryTemplate = document.querySelector("#sideBarCategory");
  var sideBarCategoryClone = sideBarCategoryTemplate.content.cloneNode(true);

  sideBarCategoryClone.querySelector(".sideBarTitle").innerText = category.charAt(0).toUpperCase() + category.slice(1);
  sideBarCategoryClone.querySelector(".sideBarTitle").href = "http://localhost/storefrontproject1/mainPage/#" + category;
  sideBarCategoryClone.querySelector(".sideBarTitle").setAttribute("onclick", 'closeSideBar()');
  
  sideBarContainer.appendChild(sideBarCategoryClone);

  // Insert products into each category
  var categoryTemplate = document.querySelector("#category");
  var productTemplate = document.querySelector("#product");


  /* Global Axios */
  axios.get("http://localhost/storefrontproject1/mainPage/data.php?source=" + category)
      .then(function(response)
      {
          var products = response.data;
          var categoryClone = categoryTemplate.content.cloneNode(true);

          categoryClone.querySelector(".categoryTitle").innerText = category.charAt(0).toUpperCase() + category.slice(1);
          categoryClone.querySelector(".categoryTitle").setAttribute("id", category);

          products.forEach(
              function(product)
              {
                  var productClone = productTemplate.content.cloneNode(true);
                  productClone.querySelector(".productImage").src = product.image;
                  productClone.querySelector(".productTitle").innerText = product.name;
                  productClone.querySelector(".price").innerText = "$" + product.price;
                  productClone.querySelector(".description").innerText = product.description;

                  categoryClone.querySelector(".productContainer").appendChild(productClone);
              }
          )
          categoryContainer.appendChild(categoryClone);
      }
  );

}

// Open and Close Sidebar Methods
function openSideBar() 
{
  document.getElementById("mySidebar").style.width = "250px";
}

function closeSideBar() 
{
  document.getElementById("mySidebar").style.width = "0";
}