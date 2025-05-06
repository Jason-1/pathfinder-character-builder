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
import { RootState } from "@/app/store";

export function AppSidebar() {
  const name = useSelector((state: RootState) => state.name.name);

  const currentLevel = useSelector((state: RootState) => state.level.level);

  const selectedClass = useSelector((state: RootState) => state.class.class);

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
