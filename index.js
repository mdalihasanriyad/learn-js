const learnLeason = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(response => response.json())
    .then(json => displayLeason(json.data))}

const removeActiveClass = () => {
    const allBtn = document.getElementsByClassName("btn-primary");
    for (const btn of allBtn) {
        btn.classList.remove("btn-active");
    }
}

const loadLevelWord = (id) => {
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)    
    .then(response => response.json())
    .then(json => {
        removeActiveClass();
        const clickBtn= document.getElementById(`level-btn-${id}`);
        clickBtn.classList.add("btn-active");
        displayLevelWord(json.data);
    })
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;  
    const response = await fetch(url)
    const details = await response.json();
    displayWordDetails(details.data);}

const displayWordDetails = (word) => {
    console.log(word);
    const wordDetailsContainer = document.getElementById("details-container");
    wordDetailsContainer.innerHTML =`<div>
    <div class="">
        <h2 class="text-2xl font-bold">${word.word}(  <i class="fa-solid-microphone-lines"></i> : ${word.pronunciation ? word.pronunciation : "Pronunciation not available"} )
        </h2>
      </div>
      <div class="">
        <h2>Meaning
        </h2>
        <p class="font-bangla text-2xl">${word.meaning}</p>
      </div>
      <div class="">
        <h2>pronunciation
        </h2>
        <p class="font-bangla text-2xl">${word.pronunciation ? word.pronunciation : "Pronunciation not available"}</p>
      </div>
      <div class="">
        <h2>synonyms
        </h2>
        <span class="btn">${word.synonyms ? word.synonyms[0] : "No synonyms available"}</span>
        <span class="btn">${word.synonyms ? word.synonyms[1] : "No synonyms available"}</span>
        <span class="btn">${word.synonyms ? word.synonyms[2] : "No synonyms available"}</span>
      </div>
    </div>`;
    document.getElementById("word_modal").showModal();

}   


const displayLevelWord = (words) => {
    const levelWordContainer = document.getElementById("level-word-container");
    levelWordContainer.innerHTML = "";

    if(words.length === 0){
        levelWordContainer.innerHTML = `
        <div class="text-center col-span-3">
        <img src="./assets/alert-error.png" alt="alart-error" class="mx-auto mb-6 w-20" />
        <p class="text-xl font-bangla font-medium text-gray-400 py-6">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-3xl font-bold ">নেক্সট Lesson এ যান</h2>
      </div>
        `;
        return;
    }
    for ( const word of words){
        const cart = document.createElement("div");
        cart.innerHTML=`
        <div class="bg-white shadow-xl rounded-xl text-center py-10 space-x-4  gap-8">
           <h2 class="text-2xl font-bold ">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h2>
           <p class="font-semibold text-xl my-4 ">Meaning /Pronounciation</p>
          <h3 class="font-bangla text-2xl ">"${word.meaning ? word.meaning : "Meaning not available"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not available"}"</h3>
           <div class="flex item-center  justify-between gap-6 p-4 ">
             <button onclick="loadWordDetails('${word.id}')" class="btn btn-primary"><i class="fa-solid fa-circle-info"></i></button>
             <button onclick="my_modal_5.showModal()" class="btn btn-primary"><i class="fa-solid fa-volume-high"></i></button>
           </div>
       </div>
        `
        levelWordContainer.append(cart);
    }
   
}

const displayLeason = (leasons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (const leason of leasons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="level-btn-${leason.level_no}" class="btn btn-outline btn-primary" onClick="loadLevelWord(${leason.level_no})"> Leason ${leason.level_no} </button>
        `
        levelContainer.append(btnDiv);
    }
}

learnLeason();