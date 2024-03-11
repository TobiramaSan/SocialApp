import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignInForms from "./_auth/forms/SignInForms";
import { Home } from "./_root/pages";
import SignUpForms from "./_auth/forms/SignUpForms";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public  route */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForms />} />
          <Route path="/sign-up" element={<SignUpForms />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
        {/* private routes */}
      </Routes>
    </main>
  );
};

export default App;
