let submit = document.querySelector('#input-form');
let repairUl = document.querySelector('.repair-list');
let clearComplete = document.querySelector('.clear-completed');

class RepairList {
  
  repairArr = [];
  
  constructor() {
    this.id = 0
  }
  addRepair(discription) {
    this.repairArr.push(new IndivdualRepair(discription,this.id))
    this.render(discription)
    this.id++
  }

  deleteRepair(id) {
    id.parentElement.remove()
    this.repairArr.forEach((ele, index) => {
      if(ele.id == id) {
      this.repairArr.splice(index, 1);
      }
    })
  }

  clearCompleted() {
   
    let parseCompleted = document.querySelectorAll('.completed')
    
    for(let i = 0; i < parseCompleted.length; i++) {  
      if(parseCompleted[i].classList.contains('completed')) {
        parseCompleted[i].remove()
      }
    };
   
    this.repairArr.forEach((element, index) => {
     if (element.isCompleted) {
        this.repairArr.splice(index, 1);
    }
  });

  }
  
  render(discription) {
    repairUl.insertAdjacentHTML("afterbegin", `
    
    <li data-id="${this.id}" class="">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>${discription}</label>
      <button class="destroy"></button>
    </div>
  </li>
  `)
     let checkMark = document.querySelector('.view')
     
     checkMark.firstElementChild.addEventListener('click', (event) => {
       
     event.target.parentElement.parentElement.classList.toggle('completed');
     
      const dataSetId = event.target.parentElement.parentElement.dataset.id
     
      
      this.repairArr.forEach((ele) => {
        if(ele.id == dataSetId) {
          if(ele.isCompleted == false) {
            ele.isCompleted = true
          } else {
            ele.isCompleted = false
          }
        }
      })
    })

      let destroy = document.querySelector('.destroy');
      destroy.addEventListener('click', (event) => {
        
        this.deleteRepair(event.target.parentElement)
      })

  }
}

class IndivdualRepair {
  constructor (discription, id) {
    this.id = id
    this.discription = discription;
    this.isCompleted = false;
  }
}

const repairList = new RepairList

submit.addEventListener('submit', (event) => {
  event.preventDefault();
  
  if (event.target.firstElementChild.value != '') {
  repairList.addRepair(event.target.firstElementChild.value);
  event.target.firstElementChild.value = '';
  }
} 
)

clearComplete.addEventListener('click', (event) => {
  repairList.clearCompleted();
})

