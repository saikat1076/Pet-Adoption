const clickBtn = () => {
    document.getElementById('spinner').style.display = "block";
    setTimeout(function () {
        loadCategoryCard(category)
    },2000);    
}

const loadBtn = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayBtn(data.categories))
    .catch((error) => console.log(error));
};
const loadCategoryCard = (category) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayCards(data.data))
    .catch((error) => console.log(error));
}

const displayBtn = (categories) =>{
    const categoryContainer = document.getElementById("categories-btn")
    categories.forEach((item) => {
        console.log(item);
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button onclick="clickBtn(); loadCategoryCard('${item.category}');" class="btn flex flex-col px-14 lg:py-8 py-12 place-content-center text-xl font-bold"><img src="${item.category_icon}" alt="" srcset="">
        <h1>${item.category} </h1></button>

        `        
        categoryContainer.append(buttonContainer);        
    });
    
}
const loadCards = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayCards(data.pets))
    .catch((error) => console.log(error));
};


const displayCards = (pets) => {
    const cardContainer = document.getElementById("cards");
        cardContainer.innerHTML = "";
        pets.forEach((pet) => {
            console.log(pet);
            const card = document.createElement("div")
            card.classList = "card border-solid border border-slate-200"
            card.innerHTML = 
            `  <figure>
    <img id="im" class="h-[250px] mx-auto py-2 rounded-s-xl"
      src="${pet.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body pt-0 px-3">
    <h2 class="card-title text-2xl">${pet.pet_name}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-border-all"></i>Breed: ${pet.breed?.length == 0 ? "not" : pet.breed}; </h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-calendar-days"></i>Birth: ${pet.date_of_birth}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-venus"></i>Gender: ${pet.gender}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-dollar-sign"></i>Price: ${pet.price}$</h2>
    <div class="card-actions flex lg:gap-10 py-3">
      <button onclick="clickLike('${pet.image}');" class="btn w-[50px] border-slate-400"><i class="fa-regular fa-thumbs-up"></i></button>
      <button class="btn lg:px-8 text-[#0E7A81] border-slate-400">Adopt</button>
      <button class="btn lg:px-5 text-[#0E7A81] border-slate-400">Details</button>
    </div>
  </div>
`
    cardContainer.append(card)
            
        });
        document.getElementById('spinner').style.display = "none";
        
}
const clickLike = (image) =>{
    console.log(image);
    const card3 = document.getElementById("cards-2")
    const imgContainer = document.createElement("div")
    imgContainer.innerHTML =`
    <div class="m-1 p-1 rounded-lg border-solid border  border-slate-300">
    <img src="${image}" alt="" srcset="">
    </div>
    `
    card3.append(imgContainer);
}



























    















loadBtn();
loadCards();

