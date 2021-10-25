class RepairList {
  repairArr = []
    
  constructor() {
  this.id = 0;  
  }

  addRepair(description, id) {
    this.repairArr.push(new IndivdualRepair(description, this.id))
    this.id++
    console.log(this.repairArr)
    this.render()
  }

  markAsCompleted(id) {
    console.log(id)
    this.repairArr.forEach((ele) => {
      if(ele.id === id) {
        if(ele.completed) {
          ele.completed = false;
        } else {
          ele.completed = true;
        }
      }
    })
    this.render() 
  }

  clearCompleted() {
    this.repairArr.forEach((ele, index) => {
      if(ele.completed === true){
        this.deleteRepair(ele.id)
      } 
    }
    )
  }

  deleteRepair(id) {
    this.repairArr.forEach((ele, index) => {
      if(ele.id === id) {
        this.repairArr.splice(index, 1)
      }
    })
    this.render()
  }

  render() {
    const repairUL = document.querySelector('.repair-list')
    repairUL.innerHTML = '';
    this.repairArr.forEach(ele => {
      repairUL.insertAdjacentHTML("beforeend", `
      <li data-id="${ele.id}" class=${ele.completed ? 'completed': '' }>
            <div class="view">
              <input class="toggle" type="checkbox" ${ele.completed ? 'checked': ''}>
              <label>${ele.description}</label>
              <button class="destroy"></button>
            </div>
          </li>
      `)

    }
    )
    
  }

}

class IndivdualRepair {

  constructor(description, id) {
    this.description = description;
    this.id = id;
    this.completed = false;
  }
}

const deansAndMayurRepairShop = new RepairList();

// deansAndMayurRepairShop.addRepair('fix computer1')
// deansAndMayurRepairShop.addRepair('fix computer1')
//deansAndMayurRepairShop.markAsCompleted(0)
//deansAndMayurRepairShop.clearCompleted()

const checkMark = document.querySelectorAll('.view')
checkMark.addEventListener('click', event => {
  console.log(event.target)
  if(event.target.className === 'toggle'){
    console.log(event.target)
    deansAndMayurRepairShop.markAsCompleted(parseInt(event.target.parentElement.parentElement.dataset.id))
  }//console.log(event.target.parentElement.parentElement)
})

