import Container from "../Container";
import FooterMid from "./FooterMid";
import FooterTop from "./FooterTop";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200">
      <Container className="px-3!">
        <FooterTop />
        <FooterMid />
        <div className="py-6 border-t border-t-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <Logo
            className="text-black text-sm"
            spanClass="group-hover:text-black"
          />
          <span>. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
