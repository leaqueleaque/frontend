import Footer from './profile/Footer';
import Header from './profile/Header';

const ProfileLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default ProfileLayout;
