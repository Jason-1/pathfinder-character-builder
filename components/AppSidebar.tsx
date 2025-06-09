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
import { selectClass, selectLevel, selectName } from "@/app/redux/selectors";

export function AppSidebar() {
  const name = useSelector(selectName);
  const selectedLevel = useSelector(selectLevel);
  const selectedClass = useSelector(selectClass);

  //------------------------------------------------------------------------------//

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-center">
          {name !== "" ? name : "No Name Entered"}, Level {selectedLevel}{" "}
          {selectedClass.name === "Select Class" ? "" : selectedClass.name}
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
