

var myStorage = window.localStorage
//use this variable to reference the current user
//if no one is logged in currentUser = null
let currentUser = localStorage.getItem('currentUser')


//==========================================================================
// Search Bar Component
//=====================================================================
class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
       }
    }

    updateSearch = (event) => {
        event.preventDefault();
        this.setState({search: event.target.value});
    }



    render()  {
        let filteredTags = this.props.recipes.filter(recipe => {
              return recipe.tags.includes(this.state.search)
            }
        )
        return(



            <form onSubmit={() => {this.props.handleSearchSubmit(event, filteredTags)}} className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2"
                       type="text"
                       value={this.state.search}
                       onChange={this.updateSearch}
                       aria-label="Search"
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
 }

//============================================================================
// New User Component
//==============================================================================



class NewUser extends React.Component {
  state = {
    regUsername: '',
    regPassword: '',
  }

  onChange = () => {
    this.setState( { [event.target.id]: event.target.value })
  }

  createUser = (event) => {
    event.preventDefault();
    event.target.reset();
    axios.post('/register', this.state).then(response => {
      this.setState({
        regUsername: '',
        regPassword: ''
      })
    })
    location.reload()
  }


  render = () => {
    return (
      <div>
        <h1>Create User</h1>
        <form onSubmit={this.createUser}>

          <label htmlFor="regUsername">Username:</label>
          <input id='regUsername' type="text" name="regUsername" onChange={this.onChange} required />
          <br/>
          <label  htmlFor="regPassword">Password:</label>
          <input id='regPassword' type="password" name="regPassword"onChange={this.onChange}  />
          <br/>
          <input class="btn btn-outline-success" type="submit" value="Create User" />
        </form>
      </div>
    )
  }
}


//=============================================================================
// Login Component
//===========================================================================

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    currentUser: ''
  }

  onChange = () => {
    this.setState( { [event.target.id]: event.target.value })
  }



  logIn = (event) => {
    event.preventDefault();
    axios.post('/login', this.state).then(response => {
      console.log(response);
      this.setState({
        username: '',
        password: '',
        currentUser: response.data.username
      })
      localStorage.setItem('currentUser', this.state.currentUser)
      location.reload()
    })
  }





  render = () => {
    return (
        <div>
        <h1>Login</h1>
        <form onSubmit={this.logIn}>
          <label htmlFor="username">Username:</label>
          <input id='username' type="text" name="username" onChange={this.onChange} required/>
          <br/>
          <label  htmlFor="logPassword">Password:</label>
          <input id='password' type="password" name="password" onChange={this.onChange}  />
          <br/>
          <input class="btn btn-outline-success" type="submit" value="Log In" />
        </form>
      </div>

      )
  }
}

//=================================================================
// Log Out
//=================================================================
class LogOut extends React.Component {
  logOut = (event) => {
    localStorage.clear()
    location.reload()
  }

  render = () => {
      return (
         <button class="btn btn-outline-success" onClick={this.logOut}>Log Out</button>
      )
  }


}

//==============================================================================
//  Header Component
//==============================================================================
class Header extends React.Component {

    render = () => {
        return <header>
            <div className="recipes-title">Git Recipe</div>

        </header>
    }
}






//=====================================================================
// Functional Stateless Components
//=====================================================================

//=====================================================================
// Nav
//=====================================================================

const Nav = (props) => {
      return <nav className="navbar fixed-top navbar-expand-lg navbar-light ">
          <a className="navbar-brand" href="#">Git Recipe</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <button type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#exampleModal"> {currentUser == null ? <text>Log In/Sign Up</text> : <text>Add Recipe</text>} </button>
          {currentUser == null ? null :  <LogOut />}

<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">


      </div>
      <div className="modal-body">

      {currentUser == null ? <Login></Login> : <AddRecipe handleChange={props.handleChange}
                handleSubmit={props.handleSubmit}/>}
      {currentUser == null ? <NewUser></NewUser> : null }

      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>
    </div>
  </div>
</div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{currentUser == null ? <text>Log In/Sign Up</text> : <text>Welcome {currentUser}!</text>}
                </a>

              </li>
            </ul>

            <SearchBar recipes={props.recipes} handleSearchSubmit={props.handleSearchSubmit}/>
          </div>
        </nav>


}
//=========================================================
//  FOOTER
//=========================================================

class Footer extends React.Component {
  render = () => {
      return <footer class="footer">
      <div class="container bottom_border">
      <div class="row">
      <div class=" col-sm-4 col-md col-sm-4  col-12 col">
      <h5 class="headin5_amrc col_white_amrc pt2">Find us</h5>

      <p class="mb10">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
      <p><i class="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35 </p>
      <p><i class="fa fa-phone"></i>  +91-9999878398  </p>
      <p><i class="fa fa fa-envelope"></i> info@example.com  </p>


      </div>


      <div class=" col-sm-4 col-md  col-6 col">
      <h5 class="headin5_amrc col_white_amrc pt2">Quick links</h5>

      <ul class="footer_ul_amrc">
      <li><a href="http://webenlance.com">Image Rectoucing</a></li>
      <li><a href="http://webenlance.com">Clipping Path</a></li>
      <li><a href="http://webenlance.com">Hollow Man Montage</a></li>
      <li><a href="http://webenlance.com">Ebay & Amazon</a></li>
      <li><a href="http://webenlance.com">Hair Masking/Clipping</a></li>
      <li><a href="http://webenlance.com">Image Cropping</a></li>
      </ul>

      </div>


      <div class=" col-sm-4 col-md  col-6 col">
      <h5 class="headin5_amrc col_white_amrc pt2">Quick links</h5>

      <ul class="footer_ul_amrc">
      <li><a href="http://webenlance.com">Remove Background</a></li>
      <li><a href="http://webenlance.com">Shadows & Mirror Reflection</a></li>
      <li><a href="http://webenlance.com">Logo Design</a></li>
      <li><a href="http://webenlance.com">Vectorization</a></li>
      <li><a href="http://webenlance.com">Hair Masking/Clipping</a></li>
      <li><a href="http://webenlance.com">Image Cropping</a></li>
      </ul>

      </div>


      <div class=" col-sm-4 col-md  col-12 col">
      <h5 class="headin5_amrc col_white_amrc pt2">Follow us</h5>


      <ul class="footer_ul2_amrc">
      <li><a href="#"><i class="fab fa-twitter fleft padding-right"></i> </a><p>Lorem Ipsum is simply dummy text of the printing...<a href="#">https://www.lipsum.com/</a></p></li>
      <li><a href="#"><i class="fab fa-twitter fleft padding-right"></i> </a><p>Lorem Ipsum is simply dummy text of the printing...<a href="#">https://www.lipsum.com/</a></p></li>
      <li><a href="#"><i class="fab fa-twitter fleft padding-right"></i> </a><p>Lorem Ipsum is simply dummy text of the printing...<a href="#">https://www.lipsum.com/</a></p></li>
      </ul>

      </div>
      </div>
      </div>


      <div class="container">
      <ul class="foote_bottom_ul_amrc">
      <li><a href="http://webenlance.com">Home</a></li>
      <li><a href="http://webenlance.com">About</a></li>
      <li><a href="http://webenlance.com">Services</a></li>
      <li><a href="http://webenlance.com">Pricing</a></li>
      <li><a href="http://webenlance.com">Blog</a></li>
      <li><a href="http://webenlance.com">Contact</a></li>
      </ul>

      <p class="text-center">Copyright @2017 | Designed With by <a href="#">Your Company Name</a></p>

      <ul class="social_footer_ul">
      <li><a href="http://webenlance.com"><i class="fab fa-facebook-f"></i></a></li>
      <li><a href="http://webenlance.com"><i class="fab fa-twitter"></i></a></li>
      <li><a href="http://webenlance.com"><i class="fab fa-linkedin"></i></a></li>
      <li><a href="http://webenlance.com"><i class="fab fa-instagram"></i></a></li>
      </ul>

      </div>

      </footer>
  }
}
//=====================================================================
// Recipe Item
//=====================================================================


const RecipeItem = (props) => {
    return ( <li className="card-items" key={props.recipe._id}>
                    <h4>{props.recipe.name} </h4>
                    <br />
                    <img src={props.recipe.image} alt={props.recipe.name}/>
                    <details><summary>More info</summary>
                      Prep time: {props.recipe.prepTime}<br />
                      Cook time: {props.recipe.cookTime}<br />
                      Ingredients: {props.recipe.ingredients}<br />
                      Instructions: {props.recipe.instructions}<br />
                      Tags: {props.recipe.tags}<br />
                      Author: {props.recipe.author}<br />
                      {/* /* STAR RATING PLACE HOLDER */ }
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    <details><summary>Edit this recipe</summary>
                      <form id={props.recipe._id} onSubmit={props.updateRecipe}>
                        <label htmlFor="name">Name</label>
                        <br />
                        <input
                          type="text"
                          id="name"
                          onChange={props.handleChange}
                          defaultValue={props.recipe.name}
                          className="form-control"
                         />
                        <br />
                        <label htmlFor="image">Image</label>
                        <br />
                        <input
                          type="text"
                          id="image"
                          onChange={props.handleChange}
                          defaultValue={props.recipe.image}
                          className="form-control"
                        />
                        <br />
                        <label htmlFor="prepTime">Prep Time</label>
                        <br />
                        <input
                          type="text"
                          id="prepTime"
                          onChange={props.handleChange}
                          defaultValue={props.recipe.prepTime}
                          className="form-control"
                        />
                        <br />
                        <label htmlFor="cookTime">Cook Time</label>
                        <br />
                        <input
                          type="text"
                          id="cookTime"
                          onChange={props.handleChange}
                          defaultValue={props.recipe.cookTime}
                          className="form-control"
                        />
                        <br />
                        <label htmlFor="instructions">Instructions</label>
                        <br />
                        <input
                          type="text"
                          id="instructions"
                          onChange={props.handleChange}
                          defaultValue={props.recipe.instructions}
                          className="form-control"
                        />
                        <br />
                        <label htmlFor="ingredients">Ingredients</label>
                        <br />
                        <input
                          type="text"
                          id="ingredients"
                          onChange={props.handleChange}
                          defaultValue={props.recipe.ingredients}
                          className="form-control"
                        />
                        <br />
                        <label htmlFor="tags">Tags</label>
                      <br />
                      <input
                        type="text"
                        id="tags"
                        onChange={props.handleChange}
                        defaultValue={props.recipe.tags}
                        className="form-control" />
                      <br />
                        <input type="submit" className="btn btn-outline-dark" value="Update Recipe" />
                      </form>
                      </details>
                      <button
                        value={props.recipe._id}
                        onClick={props.deleteRecipe}
                        className="btn btn-outline-dark"
                      >DELETE
                      </button>
                    </details>
                  </li>
    )

}
//=====================================================================
// Recipe List
//=====================================================================

const RecipeList = (props) => {
  return (
    <div className="all-recipes-container">

                <ul className="ul-cards">
                    <div className= "recipe-card">
                { props.filteredTags.map(recipe => {
                    return (

                      <RecipeItem
                        recipe={recipe}
                        deleteRecipe={props.deleteRecipe} updateRecipe={props.updateRecipe}
                        state={props.state}
                        />


                      )
                })}
                {/* recipe card div */}
                </div>
                </ul>

              </div>
  )
}

//=====================================================================
// Add Recipe
//=====================================================================

const AddRecipe = (props) => {
    return(
            <div className="form-container">
              <form onSubmit={props.handleSubmit}>
                <label htmlFor="author">Author</label><br />
                <input id="author" type="text" onChange={props.handleChange} className="form-control"/><br />
                <label htmlFor="name">Name</label>
                <br />
                <input id="name"
                  type="text"
                  onChange={props.handleChange}
                  className="form-control"  />
                <br />
                <label htmlFor="prepTime">Prep Time</label>
                <br />
                <input id="prepTime"
                  type="text"
                  onChange={props.handleChange}
                  className="form-control" />
                <br />
                <label htmlFor="cookTime">Cook Time</label>
                <br />
                <input id="cookTime"
                  type="text"
                  onChange={props.handleChange}
                  className="form-control"/>
                <br />
                <label htmlFor="ingredients">Ingredients</label>
                <br />
                <input
                  id="ingredients"
                  type="text"
                  onChange={props.handleChange}
                  className="form-control" />
                <br />
                <label htmlFor="instructions">Instructions</label>
                <br />
                <input
                  id="instructions"
                  type="text"
                  onChange={props.handleChange}
                  className="form-control" />
                <br />
                <label htmlFor="image">Image</label>
                <br />
                <input
                  id="image"
                  type="text"
                  onChange={props.handleChange}
                  className="form-control" />
                <br />
                <label htmlFor="tags">Tags</label>
                <br />
                <input
                  id="tags"
                  type="text"
                  onChange={props.handleChange}
                  className="form-control" />
                <br />
                <input

                  type="submit"
                  value="Add"
                  className="btn btn-outline-success" />
              </form>
              </div>
    )

}

//===============================================================================
// APP
//===============================================================================


class App extends React.Component {
    state = {
    author:'',
    name: '',
    prepTime: '',
    cookTime: '',
    ingredients: '',
    instructions: '',
    image: '',
    tags:'',
    comment: '',
    commentAuthor: '',
    recipes: [],
    filteredTags: [],
    filteredComments: []
    }


//=================================================================
// App functions
//=================================================================



    componentDidMount = () => {
        axios
          .get('/recipes')
          .then(response => {
            this.setState({
              recipes: response.data,
            })
          })
      }


      updateRecipe = (event) => {
          event.preventDefault()
          const id = event.target.id
          axios
            .put('/recipes/' + id, this.state)
            .then(response => {
              this.setState({
                recipes: response.data,
                  name: '',
                  prepTime:'',
                  cookTime:'',
                  ingredients: '',
                  instructions:'',
                  image:'',
                  tags:''
              })
            })
        }


          deleteRecipe = (event) => {
            axios
              .delete('/recipes/' + event.target.value)
              .then(response => this.setState({recipes: response.data,
            })

            )
            location.reload()
          }

          handleChange = event =>{
            this.setState( { [event.target.id]: event.target.value, author: currentUser })
        }
          handleSubmit = (event) => {
            event.preventDefault();
            event.currentTarget.reset();
            axios
              .post('/recipes', this.state)
              .then(response => this.setState(
                {
                    recipes: response.data,
                    author: '',
                    name: '',
                    prepTime: '',
                    cookTime: '',
                    ingredients: '',
                    instructions: '',
                    image: '',
                    tags:'',
                    comments: ''
                })
            )
            }


//=================================================================
// handle the search submit action
//=================================================================

     handleSearchSubmit = (event, filteredResults) => {
        event.preventDefault();
         this.setState({
             filteredTags: filteredResults
         })

     }


//=================================================================
// RENDER for APP
//=================================================================

          render = () => {
            return <div className="recipe-container">

            <Nav recipes={this.state.recipes} handleSearchSubmit={this.handleSearchSubmit}handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                edit={this.state}/>
            <Header />

            <RecipeList
                state= {this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleCommentSubmit={this.handleCommentSubmit}
                deleteRecipe={this.deleteRecipe}
                updateRecipe={this.updateRecipe}
                filteredTags={this.state.filteredTags}
                filteredComments={this.state.filteredComments}
              />
<Footer/>
            </div>
          }
        }

//=========================================
// The end ...
//=========================================
        ReactDOM.render(<App />, document.querySelector('main'))
