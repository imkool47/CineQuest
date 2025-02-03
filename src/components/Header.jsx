import Logo from "../assets/HeaderLogo.png";

export const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={Logo} alt="CineQuest Logo" />
        <span>The CineQuest - A quest to find the best movies</span>
      </div>
    </header>
  );
};
