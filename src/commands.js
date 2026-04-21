import { invoke } from "@tauri-apps/api/core";

export const UVT = {
    getUsername: () => invoke("get_username"),
    getLang: () => invoke("get_system_lang"),
    getHwInfo: () => invoke("hw_info"),
    
    close: () => invoke("close_app"),
    minimize: () => invoke("minimize_app"),
    startDrag: () => invoke("start_drag"),

    activate: (mode) => invoke("activate_win_realtime", { mode }),

    exec: (cmd, params = {}) => invoke(cmd, params)
};