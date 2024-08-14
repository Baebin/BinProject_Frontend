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
    equalsWithIdx(idx : any) : boolean {
        let accountIdx = localStorage.getItem("idx");
        if (accountIdx !== null && accountIdx.toString() === idx.toString())
            return true;
        return false;
    }
}

export const accountManager = new AccountManager();