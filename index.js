const learnLeason = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(response => response.json())
    .then(json => displayLeason(json.data))}

const loadLevelWord = (id) => {
    const url =`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)    
    .then(response => response.json())
    .then(json => displayLevelWord(json.data));
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
           <h2 class="text-2xl font-bold ">${word.word}</h2>
           <p class="font-semibold text-xl my-4 ">Meaning /Pronounciation</p>
          <h3 class="font-bangla text-2xl ">"${word.meaning} / ${word.pronunciation}"</h3>
           <div class="flex item-center  justify-between gap-6 p-4 ">
             <button class="btn btn-primary">Previous</button>
             <button class="btn btn-primary">Next</button>
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
        <button class="btn btn-outline btn-primary" onClick="loadLevelWord(${leason.level_no})"> Leason ${leason.level_no} </button>
        `
        levelContainer.append(btnDiv);
    }
}

learnLeason();