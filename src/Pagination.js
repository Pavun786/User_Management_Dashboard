
import "./App.css"


  function Pagination({nPages,currentPage,setCurrentPage}){

    console.log(nPages)

    let PageNumbers = [ ...Array(nPages+1).keys()].slice(1);

    console.log(PageNumbers)

    const goToPrevious = ()=>{
        console.log("exe","previous")
        if(currentPage !== 1){
            setCurrentPage(currentPage-1)
        }else if(currentPage == 1){
             alert("You reached Starting Page")
        }
    }


    console.log(currentPage)

    const goToNext =() =>{
        console.log("exe","next")
        if(currentPage !== nPages){
            setCurrentPage(currentPage+1)
        }else if(currentPage == nPages){
            alert("You reached Destination Page")
       }
    }


      return(
        <>
        <nav className="pagination-container">
            <ul className="pagination-list">
                <li onClick={goToPrevious}>Previous</li>
                 {
                    PageNumbers.map((pageNo)=>{
                        return(
                            <li onClick={()=>setCurrentPage(pageNo)}>{pageNo}</li>
                        )
                    })
                 }
                 <li onClick={goToNext}>Next</li>
            </ul>
        </nav>
        </>
      )
  }
  export default Pagination;