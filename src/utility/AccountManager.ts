class AccountManager {
    isAdmin() : boolean {
        let permission = localStorage.getItem("permission");
        if (permission !== null && permission === "ADMIN")
            return true;
        return false;
    }
    isUser() : boolean {
        return !this.isAdmin();
    }
    isOnline() : boolean {
        return (this.getToken() !== null);
    }
    equalsWithIdx(idx : any) : boolean {
        let accountIdx = this.getIdx();
        if (accountIdx !== null && accountIdx.toString() === idx.toString())
            return true;
        return false;
    }
    // Getter
    getIdx() : string | null {
        return localStorage.getItem("idx");
    }
    getName() : string | null {
        return localStorage.getItem("name");
    }
    getToken() : string | null {
        return localStorage.getItem("token");
    }
    getPermission() : string | null {
        return localStorage.getItem("permission");
    }
    // Setter
    setIdx(value : string) : void {
        localStorage.setItem("idx", value);
    }
    setName(value : string) : void {
        localStorage.setItem("name", value);
    }
    setToken(value : string) : void {
        localStorage.setItem("token", value);
    }
    setPermission(value : string) : void {
        localStorage.setItem("permission", value);
    }
    // Utility
    logout() : void {
        localStorage.removeItem("idx");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("permission");
    }
}

export const accountManager = new AccountManager();