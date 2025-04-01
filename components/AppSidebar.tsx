import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import AncestrySelector from "./AncestrySelector";
import BackgroundSelector from "./BackgroundSelector";
import ClassSelector from "./ClassSelector";
import LevelFeatures from "./LevelFeatures";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <LevelFeatures />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
