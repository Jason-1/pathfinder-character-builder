import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import LevelFeatures from "./LevelFeatures";
import { useSelector } from "react-redux";
import AncestrySelector from "./AncestrySelector";
import BackgroundSelector from "./BackgroundSelector";
import ClassSelector from "./ClassSelector";

export function AppSidebar() {
  const name = useSelector(
    (state: { name: { name: string } }) => state.name.name
  );

  const currentLevel = useSelector(
    (state: { level: { level: number } }) => state.level.level
  );

  const selectedClass = useSelector(
    (state: { class: { class: string } }) => state.class.class
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-center">
          {name !== "" ? name : "No Name Entered"}, Level {currentLevel}{" "}
          {selectedClass === "Select Class" ? "" : selectedClass}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AncestrySelector />
          <BackgroundSelector />
          <ClassSelector />
        </SidebarGroup>
        <SidebarGroup>
          <LevelFeatures />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
