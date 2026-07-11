import React, { useEffect, useState } from "react";
import {
  Gear,
  UserCircleGear,
  Robot,
  Globe,
  PencilSimpleLine,
  Toolbox,
  Nut,
  Flask,
  ShieldCheck,
  House,
  GithubLogo,
  BookOpen,
} from "@phosphor-icons/react";
import Option from "./MenuOption";
import { paths } from "../settingsPaths";

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("anythingllm_user") || "null") || null;
  } catch {
    return null;
  }
}

function SupportEmail() {
  const [supportEmail, setSupportEmail] = useState(paths.mailToMintplex());

  useEffect(() => {
    fetch("/api/system/support-email", { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => {
        if (data?.email) setSupportEmail(`mailto:${data.email}`);
      })
      .catch(() => {});
  }, []);

  return (
    <a
      href={supportEmail}
      className="text-theme-text-secondary hover:text-white hover:light:text-theme-text-primary text-xs leading-[18px] mx-3 mt-1"
    >
      Contact Support
    </a>
  );
}

function authHeaders() {
  const token = localStorage.getItem("anythingllm_authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function SidebarOptions({ user }) {
  return (
    <>
      <Option
        btnText="AI Readiness Audit"
        icon={<ShieldCheck className="h-5 w-5 flex-shrink-0" />}
        href={paths.audit.home()}
        user={user}
        roles={["admin", "manager"]}
      />
      <Option
        btnText="AI Providers"
        icon={<Gear className="h-5 w-5 flex-shrink-0" />}
        user={user}
        childOptions={[
          { btnText: "LLM", href: paths.settings.llmPreference(), flex: true, roles: ["admin"] },
          { btnText: "Vector Database", href: paths.settings.vectorDatabase(), flex: true, roles: ["admin"] },
          { btnText: "Embedder", href: paths.settings.embedder.modelPreference(), flex: true, roles: ["admin"] },
          { btnText: "Text Splitter & Chunking", href: paths.settings.embedder.chunkingPreference(), flex: true, roles: ["admin"] },
          { btnText: "Voice & Speech", href: paths.settings.audioPreference(), flex: true, roles: ["admin"] },
          { btnText: "Transcription", href: paths.settings.transcriptionPreference(), flex: true, roles: ["admin"] },
        ]}
      />
      <Option
        btnText="Admin"
        icon={<UserCircleGear className="h-5 w-5 flex-shrink-0" />}
        user={user}
        childOptions={[
          { btnText: "Users", href: paths.settings.users(), roles: ["admin", "manager"] },
          { btnText: "Workspaces", href: paths.settings.workspaces(), roles: ["admin", "manager"] },
          { btnText: "Workspace Chats", href: paths.settings.chats(), flex: true, roles: ["admin", "manager"] },
          { btnText: "Invites", href: paths.settings.invites(), roles: ["admin", "manager"] },
        ]}
      />
      <Option
        btnText="Agent Skills"
        icon={<Robot className="h-5 w-5 flex-shrink-0" />}
        href={paths.settings.agentSkills()}
        user={user}
        flex
        roles={["admin"]}
      />
      <Option
        btnText="Community Hub"
        icon={<Globe className="h-5 w-5 flex-shrink-0" />}
        user={user}
        childOptions={[
          { btnText: "Explore Trending", href: paths.communityHub.trending(), flex: true, roles: ["admin"] },
          { btnText: "Your Account", href: paths.communityHub.authentication(), flex: true, roles: ["admin"] },
          { btnText: "Import Item", href: paths.communityHub.importItem(), flex: true, roles: ["admin"] },
        ]}
      />
      <Option
        btnText="Customization"
        icon={<PencilSimpleLine className="h-5 w-5 flex-shrink-0" />}
        user={user}
        childOptions={[
          { btnText: "UI Preferences", href: paths.settings.interface(), flex: true, roles: ["admin", "manager"] },
          { btnText: "Branding & Whitelabeling", href: paths.settings.branding(), flex: true, roles: ["admin", "manager"] },
          { btnText: "Chat", href: paths.settings.chat(), flex: true, roles: ["admin", "manager"] },
        ]}
      />
      <Option
        btnText="Tools"
        icon={<Toolbox className="h-5 w-5 flex-shrink-0" />}
        user={user}
        childOptions={[
          { btnText: "Chat Embed", href: paths.settings.embedChatWidgets(), flex: true, roles: ["admin"] },
          { btnText: "Event Logs", href: paths.settings.logs(), flex: true, roles: ["admin"] },
          { btnText: "Developer API", href: paths.settings.apiKeys(), flex: true, roles: ["admin"] },
          { btnText: "System Prompt Variables", href: paths.settings.systemPromptVariables(), flex: true, roles: ["admin"] },
          { btnText: "Browser Extension", href: paths.settings.browserExtension(), flex: true, roles: ["admin", "manager"] },
        ]}
      />
      <Option
        btnText="Security"
        icon={<Nut className="h-5 w-5 flex-shrink-0" />}
        href={paths.settings.security()}
        user={user}
        flex
        roles={["admin", "manager"]}
      />
      <Option
        btnText="Experimental Features"
        icon={<Flask className="h-5 w-5 flex-shrink-0" />}
        href={paths.settings.experimental()}
        user={user}
        flex
        roles={["admin"]}
      />
    </>
  );
}

function SidebarFooter() {
  return (
    <div className="flex justify-center mb-2">
      <div className="flex space-x-4">
        <a
          href={paths.github()}
          target="_blank"
          rel="noreferrer"
          className="transition-all duration-300 p-2 rounded-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
          aria-label="GitHub"
        >
          <GithubLogo weight="fill" className="h-5 w-5" color="var(--theme-sidebar-footer-icon-fill)" />
        </a>
        <a
          href={paths.docs()}
          target="_blank"
          rel="noreferrer"
          className="transition-all duration-300 p-2 rounded-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
          aria-label="Docs"
        >
          <BookOpen weight="fill" className="h-5 w-5" color="var(--theme-sidebar-footer-icon-fill)" />
        </a>
        <a
          href={paths.settings.interface()}
          className="transition-all duration-300 p-2 rounded-full bg-theme-sidebar-footer-icon hover:bg-theme-sidebar-footer-icon-hover"
          aria-label="Settings"
        >
          <Gear weight="fill" className="h-5 w-5" color="var(--theme-sidebar-footer-icon-fill)" />
        </a>
      </div>
    </div>
  );
}

export default function SettingsSidebar() {
  const user = getUser();
  const [logo, setLogo] = useState("/favicon.png");

  useEffect(() => {
    setLogo("/api/system/logo");
  }, []);

  return (
    <div>
      <a href={paths.home()} className="flex shrink-0 max-w-[55%] items-center justify-start mx-[38px] my-[18px]">
        <img src={logo} alt="Logo" className="rounded max-h-[24px]" style={{ objectFit: "contain" }} />
      </a>
      <div className="transition-all duration-500 relative m-[16px] rounded-[16px] bg-theme-bg-sidebar border-[2px] border-theme-sidebar-border light:border-none min-w-[250px] p-[10px] h-[calc(100%-76px)]">
        <div className="w-full h-full flex flex-col overflow-x-hidden items-between min-w-[235px]">
          <div className="text-theme-text-secondary text-sm font-medium uppercase mt-[4px] mb-0 ml-2">
            Instance Settings
          </div>
          <div className="relative h-[calc(100%-60px)] flex flex-col w-full justify-between pt-[10px] overflow-y-scroll no-scroll">
            <div className="h-auto sidebar-items">
              <div className="flex flex-col gap-y-2 pb-[60px] overflow-y-scroll no-scroll">
                <SidebarOptions user={user} />
                <div className="h-[1.5px] bg-[#3D4147] mx-3 mt-[14px]" />
                <SupportEmail />
                {user?.role === "admin" && (
                  <a
                    href={paths.settings.privacy()}
                    className="text-theme-text-secondary hover:text-white hover:light:text-theme-text-primary text-xs leading-[18px] mx-3"
                  >
                    Privacy & Data
                  </a>
                )}
                <span className="text-theme-text-secondary text-xs leading-[18px] mx-3">v1.9.0</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 pt-4 pb-3 rounded-b-[16px] bg-theme-bg-sidebar bg-opacity-80 backdrop-filter backdrop-blur-md z-10">
            <SidebarFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
