/* Start of JS file for budget*/
const reasonInput = document.querySelector("#input-reason");
const amountInput = document.querySelector("#input-amount");
const cancelBtn = document.querySelector("#btn-cancel");
const confirmBtn = document.querySelector("#btn-confirm");
var editClicked = 0;
const expenseList = document.getElementById('reorder');
var totalAmount = 0;
const categoryInput = document.querySelector("#input-category");
var categoryArr = [
"Food",
"Drinks",
"Transport",
"Shopping",
"Groceries",
"Gifts",
"Charity",
"Entertainment",
"Bills",
"Education",
"Others"
];


//add event listener
confirmBtn.addEventListener('click', ()=>{
    const enteredReason = reasonInput.value;
    const enteredAmount = amountInput.value;
    const enteredCategory = categoryInput.value;
    if(categoryInput.value == undefined || categoryInput.value == ""){
      console.log(categoryInput.value);
    }
    else{
      var sortedCategory = document.getElementsByClassName(enteredCategory)[0].innerHTML;
    }
    

    if(enteredReason == "" || enteredAmount == "" || enteredCategory==undefined || enteredCategory==""){
        missingAlert();
    }
    else if (Number.isNaN(Number(enteredAmount)))
    {
        //console.log(enteredAmount);
        typeAlert();
    }
    else if(Number(enteredAmount)<=0){
      negAlert();
    }

    else{
    //console.log(enteredReason, enteredAmount);
    if (Number.isInteger(Number(enteredAmount))){
    expenseList.innerHTML += (`<ion-item-sliding class="${sortedCategory}">
                        <ion-item>
                          <ion-label class="searchItem">${enteredReason}</ion-label>
                          <ion-reorder slot="start">
                            <ion-icon name="menu-outline"></ion-icon>
                          </ion-reorder>
                          
                          <ion-icon slot="start" name=${enteredCategory}></ion-icon>

                          <ion-label class="ion-text-right decreaseAmount">$${enteredAmount}</ion-label>
                        </ion-item>
                        <ion-item-options side="end">
                          <ion-item-option color="danger" class="deleteItem">Delete</ion-item-option>
                        </ion-item-options>
                      </ion-item-sliding>`);

                      totalAmount += Number(enteredAmount);
                      totalExp.textContent = totalAmount.toFixed(2);
                      console.log(sortedCategory);
    }
    else {
      expenseList.innerHTML += (`<ion-item-sliding class="${sortedCategory}">
                        <ion-item>
                          <ion-label class="searchItem">${enteredReason}</ion-label>
                          <ion-reorder slot="start">
                            <ion-icon name="menu-outline"></ion-icon>
                          </ion-reorder>

                          <ion-icon slot="start" name=${enteredCategory}></ion-icon>

                          <ion-label class="ion-text-right decreaseAmount">$${Number(enteredAmount).toFixed(2)}</ion-label>
                        </ion-item>
                        <ion-item-options side="end">
                          <ion-item-option color="danger" class="deleteItem">Delete</ion-item-option>
                        </ion-item-options>
                      </ion-item-sliding>`);

                      totalAmount += Number(enteredAmount);
                      totalExp.textContent = totalAmount.toFixed(2);
    }
    }

});
//end event listener (confirmBtn)

cancelBtn.addEventListener('click',()=>{
    reasonInput.value = "";
    amountInput.value = "";
    categoryInput.value=undefined;
});
/*
OR
confirmBtn.addEventListener('click', function(){
    const enteredReason = reasonInput.value;
    const enteredAmount = amountInput.value;

    console.log(enteredReason, enteredAmount);
});*/

function toggleReorder() {
    const reorderGroup = document.getElementById('reorder');
    reorderGroup.disabled = !reorderGroup.disabled;
    const editButton = document.getElementById('btnEdit');
    editButton.textContent = "Done";
    editClicked += 1;
    if(editClicked%2==1){
        editButton.textContent = "Done";
    }
    else{
        editButton.textContent = "Edit";
    }
    reorderGroup.addEventListener('ionItemReorder', ({detail}) => {
      detail.complete(true);
    });
  }

  async function missingAlert() {
    const alert = await alertController.create({
      header: 'Missing field',
      message: 'You have missing fields',
      buttons: ['Ok']
    });
    await alert.present();
    }

    async function typeAlert() {
        const alert = await alertController.create({
          header: 'Wrong input',
          message: 'Expense amount must be a number',
          buttons: ['Ok']
        });
        await alert.present();
        }

        async function negAlert() {
          const alert = await alertController.create({
            header: 'Negative or zero input',
            message: 'Expense amount must be a positive number',
            buttons: ['Ok']
          });
          await alert.present();
          }


        $(document).on('click','.deleteItem',function(){
          var str = $(this).parent().parent().children("ion-item").children(".decreaseAmount").text();
          var res = str.substr(1, 20);
            //console.log(Number(res));
            totalAmount -= Number(res);
            totalExp.textContent = totalAmount.toFixed(2);
            $(this).parent().parent().remove(); 
            
            
            //var minusAmount = $(this).parent().parent().
          });

          
          
            const searchbar = document.querySelector('ion-searchbar');

          searchbar.addEventListener('ionChange', handleInput);
      
          function handleInput(event) {
            const query = event.target.value.toLowerCase();

            //console.log($("ion-item-sliding")[0].classList.contains("Transport"));

            for(var s=0; s<$("ion-item-sliding").length; s++){

              var itemChecked = $("ion-item-sliding")[s].children[0].children[0];
              if(itemChecked.textContent.toLowerCase().indexOf(query)>-1){
                $("ion-item-sliding")[s].style.display="block";
              }
              else{
                $("ion-item-sliding")[s].style.display="none";
              }

              //console.log($("ion-item-sliding")[s].classList)
              for(var ca=0; ca<categoryArr.length; ca++){
                
                if($("ion-item-sliding")[s].classList.contains(categoryArr[ca]) && categoryArr[ca].toLowerCase().indexOf(query)>-1){
                  console.log($("ion-item-sliding")[s].classList.contains(categoryArr[ca]));
                  $("ion-item-sliding")[s].style.display="block";
                  
                }
                else{
                  //console.log("no");
                }
              }
            }




          }
        
          

          /*
          const searchbar = document.querySelector('ion-searchbar');
          const items = Array.from(document.getElementById("#reorder").children());
      
          searchbar.addEventListener('ionChange', handleInput);
      
          function handleInput(event) {
            console.log(items);
            const query = event.target.value.toLowerCase();
            requestAnimationFrame(() => {
              items.forEach(item => {
                const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
                item.style.display = shouldShow ? 'block' : 'none';
              });
            });
          }*/
          const button = document.querySelector("#btn-confirm");
          button.addEventListener('click', handleButtonClick);
      
          async function handleButtonClick() {
            const toast = await toastController.create({
              color: 'primary',
              duration: 2000,
              message: 'Added successfully',
              showCloseButton: true
            });
      
            await toast.present();
          }

          const button2 = document.querySelector("#btn-cancel");
          button2.addEventListener('click', handleButtonClick2);
      
          async function handleButtonClick2() {
            const toast2 = await toastController.create({
              color: 'danger',
              duration: 2000,
              message: 'Cleared successfully',
              showCloseButton: true
            });
      
            await toast2.present();
          }

       /*
    customElements.define('modal-content', class ModalContent extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <ion-header translucent>
            <ion-toolbar>
              <ion-title>Modal Content</ion-title>
              <ion-buttons slot="end">
                <ion-button onclick="dismissModal()">Close</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content fullscreen>
            <ion-list>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="./avatar-gollum.jpg"/>
                </ion-avatar>
                <ion-label>
                  <h2>Gollum</h2>
                  <p>Sneaky little hobbitses!</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="./avatar-frodo.jpg"/>
                </ion-avatar>
                <ion-label>
                  <h2>Frodo</h2>
                  <p>Go back, Sam! I'm going to Mordor alone!</p>
                </ion-label>
              </ion-item>
              <ion-item>
                <ion-avatar slot="start">
                  <ion-img src="./avatar-samwise.jpg"/>
                </ion-avatar>
                <ion-label>
                  <h2>Samwise</h2>
                  <p>What we need is a few good taters.</p>
                </ion-label>
              </ion-item>
            </ion-list>
          </ion-content>
        `;
      }
    });

    let currentModal = null;
    const button = document.querySelector('ion-button');
    button.addEventListener('click', createModal);

    async function createModal() {
      const modal = await modalController.create({
        component: 'modal-content'
      });

      await modal.present();
      currentModal = modal;
    }

    function dismissModal() {
      if (currentModal) {
        currentModal.dismiss().then(() => { currentModal = null; });
      }
    }
*/