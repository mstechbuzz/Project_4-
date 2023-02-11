const uList=document.querySelector('ul');
const input=document.querySelector('input');


var getTags=localStorage.getItem('tags');// Get the item from local storage where key is tags
var parseTags=JSON.parse(getTags); // getTags is in String we need to parse to get the original array of items

if(parseTags!=null){//when u first time load page localstorge doesnot contain any key value pain so it returns null
      createTag(); //function to create tag of all the items present in parseTag array;
}
else{
   parseTags=[]; // fist time load its null so we add empty array
}

function createTag(){// code for creating Tag
   uList.querySelectorAll("li").forEach(li=>li.remove()); //firstly remove all tags/list from unordered list
   parseTags.slice().reverse().forEach(tag=>{
    let liTag=`<li>${tag} <i class="fa-solid fa-xmark" onclick="remove(this,'${tag}')"></i></li>`//create each list of tag
    uList.insertAdjacentHTML('afterbegin',liTag);// add liTag after begin of unorderedlist
});
}

function remove(element,tag){
    let index =parseTags.indexOf(tag) //get the index of tag in parseTag
    parseTags=[...parseTags.slice(0,index),...parseTags.slice(index+1)]; // slice the o to index-1 and slice index+1 to end add all the element in this range to parse array 
                                                                          //so that given tag remove 
    element.parentElement.remove();
    localStorage.setItem('tags',parseTags);//again set the updated array
}


function insertTag(e){
    if(e.key=='Enter'){// check enter clicks
       let tag=e.target.value.trim();///get the input field value and trim the xtra space from front and last
       console.log(tag);
       if(tag.length>1){
        tag.split(',').forEach(data => {//split tag into multipe tag if any coomaa added between
            if(!parseTags.includes(data)){//if tag already not present
            parseTags.push(data); //push tag to parseTag array;
            createTag();
            
            }
            else{//if tag already present in the array
             alert(data + " tag already present");
            }
        });
       }
       e.target.value=""; //empty the input field
       localStorage.setItem('tags',JSON.stringify(parseTags)); //set the new parseTag array to localstorage;
    }
}

input.addEventListener("keyup", insertTag); // addEventLister to the input field so that when we type and click enter tag crates


const removeBtn=document.querySelector('.footer button');
removeBtn.addEventListener("clicks",()=>{
    parseTags=[];//empty the array
    uList.querySelectorAll('li').forEach(item=>item.remove());//remove all the tags
    localStorage.setItem('tag',parseTags)
    // again set updated array

})

