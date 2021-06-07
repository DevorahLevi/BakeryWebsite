function updateCount(section)
{
    if (section === "My Cart Items")
    {
        var itemHolder = document.querySelector(".cartProducts");
        var numberItems = itemHolder.getElementsByClassName("itemWrapper").length;
        document.querySelector(".myCartItemsHeader").innerText = "My Items (" + numberItems + ")";
        document.querySelector(".subtotal").innerText = "Subtotal (" + numberItems + " items)";
    }
    else if (section === "Saved For Later")
    {
        var itemHolder = document.querySelector(".savedForLaterProducts");
        var numberItems = itemHolder.getElementsByClassName("savedItemWrapper").length;
        document.querySelector(".savedForLaterHeader").innerText = "Saved For Later (" + numberItems + ")";
    }
}

function remove(productName, section)
{
    var removeItem = document.getElementById(productName);
    removeItem.remove();
    updateCount(section);
    return removeItem;
}

function moveElement(productName, sectionFrom, sectionTo)
{
    var switchItem = remove(productName, sectionFrom);

    if (sectionTo === "My Cart Items")
    {
        var parentElement = document.querySelector(".cartProducts");
        parentElement.appendChild(switchItem);
        updateToMoveToCartItem(productName);
    }
    else if (sectionTo === "Saved For Later")
    {
        var parentElement = document.querySelector(".savedForLaterProducts");
        parentElement.insertBefore(switchItem, parentElement.children[0]);
        updateToSaveForLaterItem(productName);
    }
    updateCount(sectionTo);
}

function updateToSaveForLaterItem(productName) //was a Cart Item --> save for later item
{
    var product = document.getElementById(productName);

    // Remove x and quantity
    var removeX = product.querySelector(".x");
    var removeQuantity = product.querySelector(".quantity");
    removeX.remove();
    removeQuantity.remove();

    // Change wrapper name
    product.className = "savedItemWrapper";

    // change option save for later to option move to cart
    product.querySelector(".saveForLater").className = "option moveToCart";
    product.querySelector(".moveToCart").innerText = "Move To Cart";

    // Change delete class from cart to saved
    product.querySelector(".delete").className = "option delete saved";
}

function updateToMoveToCartItem(productName) //was a save for later item --> cart item
{
    var product = document.getElementById(productName);
    
    // change wrapper name
    product.className = "itemWrapper";

    // change option  move to cart to option save for later
    product.querySelector(".moveToCart").className = "option saveForLater";
    product.querySelector(".saveForLater").innerText = "Save For Later";

    // add x and quantity
    var getX = document.querySelector(".x");
    if (getX !== null) { // there are still elements in the cart to clone
        
        // finish adding x
        var xClone = getX.cloneNode(true);
        var parentElement = product.querySelector(".col2");
        parentElement.insertBefore(xClone, parentElement.children[1]);

        // add quantity
        var getQuantity = document.querySelector(".quantity");
        var quantityClone = getQuantity.cloneNode(true);
        var parentElement = product.querySelector(".col2");
        parentElement.insertBefore(quantityClone, parentElement.children[2]);

    } else { // (No more elements in Cart to clone it with)
        
        // add x
        var newElement = document.createElement("p");
        newElement.innerText = " x ";
        newElement.className = "x";
        var referenceNode = document.querySelector(".itemTitle");
        referenceNode.after(newElement);

        // add quantity
        var newQuantityElement = document.createElement("div");
        newQuantityElement.className = "quantity";
        newQuantityElement.innerHTML = "<select name = 'quantityInput' class = 'itemCount'>" + 
                                            "<option value = '1'>  1  </option>" + 
                                            "<option value = '2'>  2  </option>" +
                                            "<option value = '3'>  3  </option>" +
                                            "<option value = '4'>  4  </option>" +
                                            "<option value = '5'>  5  </option>" +
                                            "<option value = '6'>  6  </option>" +
                                            "<option value = '7'>  7  </option>" +
                                            "<option value = '8'>  8  </option>" +
                                            "<option value = '9'>  9  </option>" +
                                            "<option value = '10'> 10 </option>" +
                                        "</select>";
        var newReferenceNode = document.querySelector(".x");
        newReferenceNode.after(newQuantityElement);
    }
    
    // Change delete class from saved to cart
    product.querySelector(".delete").className = "option delete cart";
}



///* Add products to Cart Products *///

var itemContainer = document.querySelector(".cartProducts");
var itemTemplate = document.querySelector("#item");

/* Global Axios */
axios.get("http://localhost/storefrontproject1/cart/data.php?source=muffins")
    .then(function(response)
    {
        var products = response.data;

        products.forEach(
            function(product)
            {
                var productClone = itemTemplate.content.cloneNode(true);
                productClone.querySelector(".itemImage").src = product.image;
                productClone.querySelector(".itemTitle").innerText = product.name;
                productClone.querySelector(".itemPrice").innerText = "$" + product.price;

                // setting id for use in on-click functions
                var item = productClone.querySelector(".itemWrapper");
                item.setAttribute("id", product.name);

                item.onclick = function(e) {
                     // on-click function for remove method
                    if (e.target && e.target.classList.contains("delete") && (e.target.classList.contains("cart"))) {
                        remove(product.name, "My Cart Items");
                    }
                    else if (e.target && e.target.classList.contains("delete") && (e.target.classList.contains("saved"))) {
                        remove(product.name, "Saved For Later");
                    }
                    // on-click function for save for later method
                    else if (e.target && e.target.classList.contains("saveForLater")) {
                        moveElement(product.name, "My Cart Items", "Saved For Later");
                    }
                    // on-click function for move to cart method
                    else if (e.target && e.target.classList.contains("moveToCart")) {
                        moveElement(product.name, "Saved For Later", "My Cart Items");
                    }
                }

                itemContainer.append(productClone);
            }
        )
    }
);



///* Add products to Saved For Later Products *///

itemContainerSavedForLater = document.querySelector(".savedForLaterProducts");
itemTemplateSavedForLater = document.querySelector("#savedItem");

/* Global Axios */
axios.get("http://localhost/storefrontproject1/cart/data.php?source=pastries")
    .then(function(response)
    {
        var products = response.data;

        products.forEach(
            function(product)
            {
                var productClone = itemTemplateSavedForLater.content.cloneNode(true);
                productClone.querySelector(".itemImage").src = product.image;
                productClone.querySelector(".itemTitle").innerText = product.name;
                productClone.querySelector(".itemPrice").innerText = "$" + product.price;

                // set ids for on-click methods
                var item = productClone.querySelector(".savedItemWrapper");
                item.setAttribute("id", product.name);

                item.onclick = function(e) {
                    // on-click function for remove method
                    if (e.target && e.target.classList.contains("delete") && (e.target.classList.contains("cart"))) {
                        remove(product.name, "My Cart Items");
                    }
                    else if (e.target && e.target.classList.contains("delete") && (e.target.classList.contains("saved"))) {
                        remove(product.name, "Saved For Later");
                    }
                    // on-click function for move to cart method
                    else if (e.target && e.target.classList.contains("moveToCart")) {
                        moveElement(product.name, "Saved For Later", "My Cart Items");
                    }
                    // on-click function for save for later method
                    else if (e.target && e.target.classList.contains("saveForLater")) {
                        moveElement(product.name, "My Cart Items", "Saved For Later");
                    }
                }                            

                itemContainerSavedForLater.append(productClone);
            }
        )
    }
);