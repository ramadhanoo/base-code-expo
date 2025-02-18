import Toast from "react-native-toast-message";

type Prop = {
  title: string;
};

const AppToast = {
  showInfo: ({ title }: Prop) => Toast.show({ type: "info", text1: title }),
  showSuccess: ({ title }: Prop) =>
    Toast.show({ type: "success", text1: title }),
  showError: ({ title }: Prop) => Toast.show({ type: "error", text1: title }),
};

export default AppToast;
