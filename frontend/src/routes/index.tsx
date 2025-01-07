import LoginPage from "@/pages/LoginPage"; // Your login page component
import { Navigate, Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage";
import { useFrappeAuth } from "frappe-react-sdk";
import ChatPage from "@/pages/ChatPage";
import ConversationPage from "@/pages/ConversationPage";

const AppRoutes = () => {
  const { currentUser, isValidating, isLoading } = useFrappeAuth();

  if (isValidating || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!currentUser ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/"
        element={currentUser ? <HomePage /> : <Navigate to="/login" />}
      >
        <Route index element={<ConversationPage />} />
        <Route path=":conversationId" element={<ChatPage />} />
      </Route>

      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
};

export default AppRoutes;
