import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Conversation } from "@/types/AiChatbot/Conversation";
import {
  useFrappeDocTypeEventListener,
  useFrappeGetDocList,
} from "frappe-react-sdk";
import { NavLink, useParams } from "react-router";
import NavUser from "./NavUser";

export function AppSidebar() {
  const { data, mutate } = useFrappeGetDocList<Conversation>("Conversation", {
    fields: ["title", "user", "name", "embedding_status"],
  });

  useFrappeDocTypeEventListener("Conversation", () => {
    mutate();
  });

  const { conversationId } = useParams();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              I
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight ml-2">
              <span className="truncate font-semibold">Inquiro</span>
              <span className="truncate text-xs">AI chatbot</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data?.map((conversation) => (
                <SidebarMenuItem
                  key={conversation.name}
                  className={
                    conversationId === conversation.name ? "bg-muted" : ""
                  }
                >
                  <SidebarMenuButton asChild>
                    <NavLink to={"/" + conversation.name}>
                      <span>{conversation.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
