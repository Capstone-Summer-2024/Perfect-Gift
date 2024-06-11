import "./NavBar.css"
import LoginLogo from './assets/LoginLogo.png';
import DropdownLogo from './assets/DropdownLogo.png';

function NavBar(){
    return(
      <header className="NavBar">
        <span style={{fontSize:'2rem', fontWeight:'bold', fontStyle: 'normal'}}>Perfect Gift</span>
  
        <p1 class="NavButtons">
          <DropdownButton />
          <HeaderLoginButton />
        </p1>
      </header>
    )
  }
  
  function DropdownButton(){
    return(
        <input className="HeaderDropdownButton" type='image' src={DropdownLogo} alt='Dropdown Button' width= "75" height= "60" />
    )
  }
  
  function HeaderLoginButton(){
    return(
      <input className="HeaderLoginButton" type='image' src={LoginLogo} alt='Login Button' width= "65" height= "65"/>
    )
  }

export default NavBar;