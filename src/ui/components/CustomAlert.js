import { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { GlobalConsts } from "../../consts/GlobalConsts";

const CustomAlert = ({ title, message }) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <>
      <AwesomeAlert
        show={showAlert}
        title={"Oh! there is an issue"}
        message={"No Sales have been captured"}
        showConfirmButton={true}
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
        confirmButtonColor={GlobalConsts.Colors.primaryGreenTextColor}
      ></AwesomeAlert>
    </>
  );
};

export default CustomAlert;
