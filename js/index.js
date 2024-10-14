const clickBtn = () => {
    document.getElementById('spinner').style.display = "block";
       
     document.getElementById("sec1").classList.add("hidden")
    setTimeout(function () {
        document.getElementById('spinner').style.display = "none";

        document.getElementById("sec1").classList.remove("hidden")
        loadCategoryCard(category);
    },2000);    
}
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('active');
    }
    
}

const loadBtn = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayBtn(data.categories))
    .catch((error) => console.log(error));
};
const loadCategoryCard = (category) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${category}`)
        activeBtn.classList.add('active');
        
        displayCards(data.data)
    })
    .catch((error) => console.log(error));
}
const loadDetails = async(id) =>{
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.petData);
}
const adoptBtn = (button) => {
    const btnContainer = document.getElementById("Adopt");
    some();
    button.disabled = true;
    button.innerHTML =`
    <button>Adopted</button>
    `
    document.getElementById("adoptModal").showModal(); 
}

const some = () => {
    const countdown = (seconds) => {
        const countdownElement = document.getElementById('Adopt');
        countdownElement.innerHTML = "";
        const adoptModal = document.getElementById('adoptModal'); 
        const interval = setInterval(() => {
            if (seconds >= 0) {
                countdownElement.innerHTML = `
       <figure>
        <img id="im" class="h-[100px] mx-auto py-2 rounded-s-xl"
            src="https://img.freepik.com/premium-vector/flat-style-background-business-handshake_1104738-186.jpg"
            alt="Shoes" />
      </figure>
       <div>
           <h1 class="text-3xl font-bold flex justify-center">Congrates</h1>
           <h1 class="text-lg font-bold flex justify-center">Adoption process is start For your pet</h1>
           <h1 class="text-2xl font-bold flex justify-center">${seconds}</h1>
       </div>
       `;
                seconds--;
            } else {
                clearInterval(interval);
                adoptModal.close(); 
            }
        }, 1000); 
    };
    countdown(3); 
};

const displayDetails = (petData) => {
    console.log(petData);
    const DetailsContainer = document.getElementById("content");
    DetailsContainer.innerHTML = `
     <figure>
    <img id="im" class="h-[250px] mx-auto py-2 rounded-s-xl"
      src="${petData.image}"
      alt="Shoes" />
  </figure>
  <div class="card-body pt-0 px-0">
    <h2 class="card-title text-2xl">${petData.pet_name}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-border-all"></i>Breed: ${petData.breed || "No Data Available"} </h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-calendar-days"></i>Birth: ${petData.date_of_birth || "No Data Available"}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-venus"></i>Gender: ${petData.gender || "No Data Available"}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-dollar-sign"></i>Price: ${petData.price || "No Data Available"}$</h2>
    <h1 class="card-title text-2xl">Details Information:</h1>
        <h2 class="card-title font-normal">${petData.pet_details}</h2>
    `
    document.getElementById("customModal").showModal();
}

const displayBtn = (categories) =>{
    const categoryContainer = document.getElementById("categories-btn")
    categories.forEach((item) => {
        console.log(item);
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${item.category}" onclick="clickBtn(); loadCategoryCard('${item.category}');" class="btn flex flex-col px-14 lg:py-8 py-12 place-content-center text-xl font-bold category-btn"><img src="${item.category_icon}" alt="" srcset="">
        <h1>${item.category} </h1></button>

        `        
        categoryContainer.append(buttonContainer);        
    });
    
}
const loadCards = () =>{
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
        
        currentPets = [...data.pets];
        displayCards(data.pets)
    })
    .catch((error) => console.log(error));
};


const displayCards = (pets) => {
    const cardContainer = document.getElementById("cards");
        cardContainer.innerHTML = "";
        if (pets.length == 0) {
            cardContainer.classList.remove("grid")
            cardContainer.innerHTML = `
            <div class="min-h-[200px] flex flex-col gap-5 justify-center items-center">
            <img src="images/error.webp" />
            <h2 class="text-3xl font-bold">No Information Available</h2>
            <p class="text-center w-2/3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
            its layout. The point of using Lorem Ipsum is that it has a.</p>
            `
        } else {
            cardContainer.classList.add("grid")

        }
        pets.forEach((pet) => {
            console.log(pet);
            console.log(pet.breed, pet.price);
            
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
    <h2 class="card-title font-normal"><i class="fa-solid fa-border-all"></i>Breed: ${pet.breed || "No Data Available"} </h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-calendar-days"></i>Birth: ${pet.date_of_birth || "No Data Available"}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-venus"></i>Gender: ${pet.gender || "No Data Available"}</h2>
    <h2 class="card-title font-normal"><i class="fa-solid fa-dollar-sign"></i>Price: ${pet.price || "No Data Available"}$</h2>
    <div class="card-actions flex lg:gap-5 py-3">
      <button onclick="clickLike('${pet.image}');" class="btn w-[50px] border-slate-400"><i class="fa-regular fa-thumbs-up"></i></button>
      <button onclick="adoptBtn(this)" class="btn lg:px-8 text-[#0E7A81] border-slate-400">Adopt</button>
      <button onclick="loadDetails(${pet.petId})" class="btn lg:px-5 text-[#0E7A81] border-slate-400">Details</button>
    </div>
  </div>
`
    cardContainer.append(card) 
        });
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

document.getElementById("sortBtn").addEventListener("click", () => {
    if (currentPets.length > 0) {
        const sortedPets = currentPets.sort((a, b) => 
            b.price - a.price);
        displayCards(sortedPets);
    }
})

loadBtn();
loadCards();
loadPets();

