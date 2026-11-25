(function () {
  function init(props) {
    let users = this.seedUsers(),
      roles = this.seedRoles(),
      teams = this.seedTeams(),
      coupons = this.seedCoupons(),
      news = this.seedNews(),
      monitors = this.seedMonitors(),
      tutorials = this.seedTutorials(),
      curId = "";
    let members = this.seedMembers(),
      payments = this.seedPayments(),
      payCfg = this.seedPayCfg(),
      gwBatches = this.seedGatewayBatches(),
      stations = this.seedStations(),
      accessLogs = this.seedAccessLogs();
    let termsDoc = this.seedTerms(),
      privacyDoc = this.seedPrivacy(),
      permPolicy = this.seedPermPolicy(),
      categories = this.seedCategories();
    try {
      const sro = JSON.parse(localStorage.getItem("cx-bo-roles") || "null");
      if (Array.isArray(sro) && sro.length) roles = sro;
      const stm = JSON.parse(localStorage.getItem("cx-bo-teams") || "null");
      if (Array.isArray(stm) && stm.length) teams = stm;
      const su = JSON.parse(localStorage.getItem("cx-bo-users") || "null");
      if (Array.isArray(su) && su.length) users = su;
      users = users.map((u) => this.normAdminUser(u, roles));
      roles = roles.map((r) => this.normRole(r));
      teams = teams.map((t) => this.normTeam(t));
      const sc = JSON.parse(
        localStorage.getItem("cx-wallet-coupons") || "null",
      );
      if (Array.isArray(sc) && sc.length)
        coupons = sc.map((c) => this.normCoupon(c));
      else coupons = coupons.map((c) => this.normCoupon(c));
      const sn = JSON.parse(localStorage.getItem("cx-bo-news") || "null");
      if (Array.isArray(sn) && sn.length) news = sn;
      const sm = JSON.parse(localStorage.getItem("cx-bo-monitors") || "null");
      if (Array.isArray(sm) && sm.length) monitors = sm;
      const stut = JSON.parse(
        localStorage.getItem("cx-tutorial-slides") || "null",
      );
      if (Array.isArray(stut)) tutorials = stut;
      const smb = JSON.parse(localStorage.getItem("cx-bo-members") || "null");
      if (Array.isArray(smb) && smb.length) members = smb;
      const spay = JSON.parse(localStorage.getItem("cx-bo-payments") || "null");
      if (Array.isArray(spay) && spay.length) payments = spay;
      const spc = JSON.parse(localStorage.getItem("cx-bo-pay-cfg") || "null");
      if (spc && typeof spc === "object")
        payCfg = Object.assign({}, payCfg, spc);
      const sgw = JSON.parse(
        localStorage.getItem("cx-bo-gw-batches") || "null",
      );
      if (Array.isArray(sgw) && sgw.length) gwBatches = sgw;
      const sst = JSON.parse(localStorage.getItem("cx-bo-stations") || "null");
      if (Array.isArray(sst) && sst.length) stations = sst;
      const sal = JSON.parse(
        localStorage.getItem("cx-bo-access-logs") || "null",
      );
      if (Array.isArray(sal) && sal.length) accessLogs = sal;
      const strm = JSON.parse(localStorage.getItem("cx-bo-terms") || "null");
      if (strm && typeof strm === "object")
        termsDoc = Object.assign({}, termsDoc, strm);
      const spri = JSON.parse(localStorage.getItem("cx-bo-privacy") || "null");
      if (spri && typeof spri === "object")
        privacyDoc = Object.assign({}, privacyDoc, spri);
      const spp = JSON.parse(
        localStorage.getItem("cx-bo-perm-policy") || "null",
      );
      if (spp && typeof spp === "object")
        permPolicy = Object.assign({}, permPolicy, spp);
      const scat = JSON.parse(
        localStorage.getItem("cx-bo-categories") || "null",
      );
      if (Array.isArray(scat) && scat.length) categories = scat;
      const ss = JSON.parse(localStorage.getItem("cx-bo-session") || "null");
      if (ss && ss.id) curId = ss.id;
    } catch (e) {}
    users = users.map((u) => this.normAdminUser(u, roles));
    roles = roles.map((r) => this.normRole(r));
    teams = teams.map((t) => this.normTeam(t));
    const scr = this.screenState(props.screen, users, curId);
    const defStart = this.todayIso();
    const defEnd = this.addDaysIso(defStart, 30);
    const rpEnd = defStart > "2026-11-17" ? defStart : "2026-11-17";
    const initAvUser = users.find((u) => u.id === scr.curId) || users[0];
    let tutReplayEnabled = true;
    try {
      if (localStorage.getItem("cx-tutorial-replay-enabled") === "0")
        tutReplayEnabled = false;
    } catch (e) {}
    let initTheme = props.theme === "dark" ? "dark" : "";
    if (!initTheme) {
      try {
        const savedTh = localStorage.getItem("cx-bo-theme");
        if (savedTh === "dark" || savedTh === "light") initTheme = savedTh;
      } catch (e) {}
    }
    const initNw = news.find((n) => n.id === "nw3") ||
      news[0] || {
        id: "",
        tag: "ข่าวสาร",
        title: "",
        body: "",
        sendMode: "now",
        schedDate: this.defaultSchedDate(),
        schedTime: "09:00",
        status: "published",
      };
    this.state = Object.assign(
      {
        theme: initTheme,
        users,
        roles,
        teams,
        coupons,
        news,
        monitors,
        tutorials,
        members,
        payments,
        payCfg,
        gwBatches,
        stations,
        accessLogs,
        termsDoc,
        privacyDoc,
        permPolicy,
        categories,
        lUser: "",
        lPw: "",
        lShowPw: false,
        lErr: "",
        lRoleMode: "super_admin",
        lRemember8h: true,
        lSandboxOpen: false,
        lFailCount: 0,
        lLockUntil: 0,
        lForgotOpen: false,
        lForgotEmail: "",
        lForgotSent: "",
        lFirstDemo: false,
        lFirstResetUid: "",
        lFtPw: "",
        lFtPw2: "",
        lFtErr: "",
        modal: "",
        modalErr: "",
        opName: "",
        opEmail: "",
        opPw: "",
        newPw: "",
        umSearch: "",
        umTypeFilter: "all",
        umRoleFilter: "all",
        umStatFilter: "all",
        umTeamFilter: "all",
        umSection: "users",
        umDrop: "",
        umDropTop: 260,
        umDropLeft: 320,
        umMenuId: "",
        umMenuTop: 260,
        umMenuRight: 44,
        umDelId: "",
        umDelKind: "admin",
        umDelConfirm: "",
        umAssignTeamId: "",
        umAssignTeamKind: "admin",
        umAssignTeamVal: "",
        umEditId: "",
        umEditKind: "admin",
        umFormType: "admin",
        umName: "",
        umEmail: "",
        umPhone: "",
        umDept: "",
        umRoleId: "role_op",
        umTeam: "Operations & Marketing",
        umPerms: ["coupons", "news", "monitor"],
        umStatus: "active",
        umPw: "",
        umPw2: "",
        umDetId: "",
        umDetKind: "admin",
        umPwTargetId: "",
        umPwTargetKind: "admin",
        umNewPw: "",
        umNewPw2: "",
        umUndo: null,
        umUndoKind: "admin",
        umUndoIdx: 0,
        roleSelMatrixId: "role_op",
        roleEditId: "",
        roleReadOnly: false,
        roleName: "",
        roleDesc: "",
        rolePerms: ["coupons", "news", "monitor"],
        rolePermLevels: {
          dashboard: "none",
          operators: "none",
          stations: "none",
          coupons: "edit",
          news: "edit",
          monitor: "edit",
          tutorial: "none",
          payments: "none",
          reports: "none",
          settings: "none",
        },
        tmEditId: "",
        tmModalTab: "info",
        tmName: "",
        tmDesc: "",
        tmLead: "",
        tmScope: "",
        tmMemberIds: [],
        selfName: "",
        selfEmail: "",
        selfPhone: "",
        selfDept: "",
        selfPw: "",
        selfPw2: "",
        selfAvImg: initAvUser.avatar,
        setView: "profile",
        setAvUserId: initAvUser.id,
        setAvImg: initAvUser.avatar,
        setAvUrlOpen: false,
        setLangScope: (() => { try { return localStorage.getItem("cx-bo-lang-scope") === "backoffice" ? "backoffice" : "all"; } catch (e) { return "all"; } })(),
        setPwUserId: initAvUser.id,
        setPwVisible: false,
        setNewPw: "",
        setNewPw2: "",
        setLegalDoc: "terms",
        setLegalPreviewLang: "th",
        setTermsTitle: termsDoc.title,
        setTermsTitleEn: termsDoc.titleEn || "Charge X Terms of Service",
        setTermsVer: termsDoc.version,
        setTermsDate: termsDoc.effectiveDate,
        setTermsReconsent: !!termsDoc.forceReconsent,
        setTermsText: this.fmtDocSections(termsDoc.sections),
        setTermsItems: this.buildLegalItems(termsDoc.sections, termsDoc.sectionsEn),
        setPrivTitle: privacyDoc.title,
        setPrivTitleEn: privacyDoc.titleEn || "Charge X Privacy Policy (PDPA)",
        setPrivVer: privacyDoc.version,
        setPrivDate: privacyDoc.effectiveDate,
        setPrivDpo: privacyDoc.dpo,
        setPrivReconsent: !!privacyDoc.forceReconsent,
        setPrivText: this.fmtDocSections(privacyDoc.sections),
        setPrivItems: this.buildLegalItems(privacyDoc.sections, privacyDoc.sectionsEn),
        setMatrixRoleId: "role_op",
        setCatGroupFilter: "all",
        catEditId: "",
        catGroup: "news",
        catName: "",
        catNameEn: "",
        catDesc: "",
        catStat: "active",
        catUndo: null,
        catUndoIdx: 0,
        cpSearch: "",
        cpFilter: "all",
        cpEditId: "",
        cpCode: "",
        cpTitle: "",
        cpDiscType: "flat",
        cpUsageType: "สินค้าและบริการ",
        cpVal: "60",
        cpMaxDisc: "100",
        cpMin: "150",
        cpTotalQty: "500",
        cpPerUser: "1",
        cpStartDate: defStart,
        cpEndDate: defEnd,
        cpStackable: false,
        cpNewUserOnly: false,
        cpStatus: "avail",
        cpUndo: null,
        cpUndoIdx: 0,
        nwSearch: "",
        nwFilter: "all",
        nwPanelOpen: true,
        nwEditId: initNw.id || "",
        nwTag: initNw.tag || "ข่าวสาร",
        nwTitle: initNw.title || "",
        nwBody: initNw.body || "",
        nwSendMode: initNw.sendMode === "scheduled" ? "scheduled" : "now",
        nwSchedDate: initNw.schedDate || this.defaultSchedDate(),
        nwSchedTime: initNw.schedTime || "09:00",
        nwStatus: initNw.status === "draft" ? "draft" : "published",
        nwUndo: null,
        nwUndoIdx: 0,
        tutEditId: "",
        tutTitle: "",
        tutDesc: "",
        tutImg: this.tutImg("map"),
        tutSlide: 0,
        tutAutoPlay: false,
        tutUndo: null,
        tutUndoIdx: 0,
        tutReplayEnabled,
        tutDragIdx: -1,
        tutDragOverIdx: -1,
        paySearch: "",
        payFilter: "all",
        payFrom: "2026-11-01",
        payTo: "2026-11-30",
        peEditId: "",
        peMemberId: "mb1",
        peMemberName: "",
        peAmount: "500",
        peType: "เติมเงิน Wallet (ไม่เข้า)",
        peChannel: "KBank K-Plus · Slip",
        peStatus: "pending",
        peDate: defStart,
        peTaxName: "",
        peTaxId: "",
        peNote: "",
        slipPayId: "",
        slipPreview: "",
        slipFileName: "",
        slipMime: "",
        docPayId: "",
        docType: "tax",
        pcCompany: payCfg.company,
        pcTaxId: payCfg.taxId,
        pcAddr: payCfg.addr,
        pcBankName: payCfg.bankName,
        pcBankAcc: payCfg.bankAcc,
        pcGateway: payCfg.gateway,
        pcMerchantId: payCfg.merchantId,
        pcCycle: payCfg.cycle,
        walletSearch: "",
        walletRoleFilter: "all",
        waMemberId: "",
        waRole: "ผู้ใช้ทั่วไป",
        waMode: "credit",
        waAmount: "200",
        waReason: "",
        waStatus: "active",
        stSearch: "",
        stFilter: "all",
        stOwnerFilter: "all",
        stViewMode: "table",
        stMapSelId: "st1",
        stMenuId: "",
        stMenuTop: 260,
        stMenuRight: 44,
        stDelId: "",
        stModalTab: "general",
        stEditId: "",
        stCode: "STN-009",
        stImg: "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
        stName: "",
        stNameEn: "",
        stOwner: "บริษัท ชาร์จ เอ็กซ์ (ประเทศไทย) จำกัด",
        stContractType: "ลงทุนเอง 100%",
        stOwnerTaxId: "0105564008912",
        stAddr: "",
        stArea: "",
        stLat: "13.6682",
        stLng: "100.6845",
        stMapUrl: "https://www.google.com/maps?q=13.6682,100.6845",
        stContactName: "",
        stContactPhone: "",
        stHours: "เปิด 24 ชม.",
        stChargers: "2",
        stBays: "4",
        stPower: "150 kW DC · 4 หัว",
        stStatus: "online",
        stFaultCount: "0",
        stFaultDate: "ยังไม่มีเหตุขัดข้อง",
        stFaultDetail: "ไม่พบแจ้งขัดข้องในช่วง 30 วันที่ผ่านมา",
        stUnits: [],
        stIncidents: [],
        stNewUnitCode: "",
        stNewUnitPower: "150 kW DC · 2 หัว",
        stNewIncNote: "",
        stUndo: null,
        stUndoIdx: 0,
        rpSearch: "",
        rpFrom: "2026-11-01",
        rpTo: rpEnd,
        rpDatePreset: "custom",
        rpConnFilter: "all",
        rpSlotFilter: "all",
        rpStationFilter: "all",
        rpRoleFilter: "all",
        rpSection: "usage",
        rpDrop: "",
        rpDropTop: 220,
        rpDropLeft: 320,
        rpRealTime: true,
        rpRtTick: 1,
        rpLastSyncTime: this.nowHms(),
        toast: "",
        topSearch: "",
        dPreset: "7d",
        dFrom: "2026-11-11",
        dTo: "2026-11-17",
        cmpMetric: "sessions",
        memSearch: "",
        memFilter: "all",
      },
      scr,
    );
  }
  class CoreProto {
    todayIso() {
      const t = new Date();
      return (
        t.getFullYear() +
        "-" +
        String(t.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(t.getDate()).padStart(2, "0")
      );
    }
    addDaysIso(iso, days) {
      return this.toIso(this.parseIso(iso) + days * 86400000);
    }
    normCoupon(c) {
      const today = this.todayIso();
      const x = Object.assign({}, c);
      x.discUnit = x.discType === "pct" ? "pct" : "flat";
      x.usageType =
        x.usageType ||
        (x.kind === "topup"
          ? "เติมเงิน Wallet"
          : x.code === "CASH30"
            ? "Membership"
            : "สินค้าและบริการ");
      x.minSpend = Math.max(0, Number(x.minSpend) || 0);
      x.maxDisc = Math.max(0, Number(x.maxDisc) || Number(x.discVal) || 0);
      x.totalQty = Math.max(1, Number(x.totalQty) || 500);
      x.usedQty = Math.max(0, Math.min(x.totalQty, Number(x.usedQty) || 0));
      x.perUserLimit = Math.max(1, Number(x.perUserLimit) || 1);
      x.startDate = x.startDate || today;
      x.endDate = x.endDate || "2026-12-31";
      x.stackable = !!x.stackable;
      x.newUserOnly =
        x.newUserOnly !== undefined
          ? !!x.newUserOnly
          : /ผู้ใช้ใหม่|สมาชิกใหม่|^NEW/i.test(
              String(x.title || "") + " " + String(x.code || ""),
            );
      x.status = x.status || "avail";
      return x;
    }
    defaultSchedDate() {
      const t = new Date(Date.now() + 86400000);
      return (
        t.getFullYear() +
        "-" +
        String(t.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(t.getDate()).padStart(2, "0")
      );
    }
    screenState(s, users, savedCurId) {
      if (s === "Super Admin (Dashboard)")
        return { curId: "u1", tab: "dashboard", modal: "", lErr: "" };
      if (s === "Operator (Dashboard)")
        return { curId: "u2", tab: "coupons", modal: "", lErr: "" };
      if (savedCurId && Array.isArray(users)) {
        const u = users.find(
          (x) => x.id === savedCurId && x.status === "active",
        );
        if (u)
          return {
            curId: u.id,
            tab: u.role === "super_admin" ? "dashboard" : "coupons",
            modal: "",
            lErr: "",
          };
      }
      return { curId: "", tab: "dashboard", modal: "", lErr: "" };
    }
    nowHms() {
      const t = new Date();
      return (
        String(t.getHours()).padStart(2, "0") +
        ":" +
        String(t.getMinutes()).padStart(2, "0") +
        ":" +
        String(t.getSeconds()).padStart(2, "0")
      );
    }
    startRtTimer() {
      clearInterval(this._rtT);
      this._rtT = setInterval(() => {
        const cur = this.state;
        if (!cur || !cur.curId || cur.tab !== "reports" || !cur.rpRealTime)
          return;
        this.setState({
          rpRtTick: (cur.rpRtTick || 1) + 1,
          rpLastSyncTime: this.nowHms(),
        });
      }, 3000);
    }
    syncStoreKeys() {
      try {
        const next = {
          rpRtTick: (this.state.rpRtTick || 1) + 1,
          rpLastSyncTime: this.nowHms(),
        };
        const sst = JSON.parse(
          localStorage.getItem("cx-bo-stations") || "null",
        );
        if (Array.isArray(sst) && sst.length) next.stations = sst;
        const sm = JSON.parse(localStorage.getItem("cx-bo-monitors") || "null");
        if (Array.isArray(sm) && sm.length) next.monitors = sm;
        const smb = JSON.parse(localStorage.getItem("cx-bo-members") || "null");
        if (Array.isArray(smb) && smb.length) next.members = smb;
        const sal = JSON.parse(
          localStorage.getItem("cx-bo-access-logs") || "null",
        );
        if (Array.isArray(sal) && sal.length) next.accessLogs = sal;
        const spay = JSON.parse(
          localStorage.getItem("cx-bo-payments") || "null",
        );
        if (Array.isArray(spay) && spay.length) next.payments = spay;
        this.setState(next);
      } catch (e) {}
    }
    componentDidMount() {
      if (typeof window !== "undefined") {
        this._rtStorageL = (e) => {
          if (
            !e ||
            !e.key ||
            [
              "cx-bo-stations",
              "cx-bo-monitors",
              "cx-bo-members",
              "cx-bo-access-logs",
              "cx-bo-payments",
              "cx-wallet-bal",
            ].indexOf(e.key) >= 0
          ) {
            this.syncStoreKeys();
          }
        };
        window.addEventListener("storage", this._rtStorageL);
      }
      if (this.state.rpRealTime) this.startRtTimer();
    }
    componentDidUpdate(pp) {
      if (pp.screen !== this.props.screen)
        this.setState(
          this.screenState(this.props.screen, this.state.users, ""),
        );
      this.syncTutFrames();
    }
    syncTutFrames() {
      if (typeof window !== "undefined" && !this._guideReadyL) {
        this._guideReadyL = (ev) => {
          const d = ev && ev.data;
          if (!d) return;
          if (d.type === "cx-guide-ready") this.syncTutFrames();
          else if (
            d.type === "cx-guide-step" &&
            typeof d.step === "number" &&
            this.state.modal !== "tut" &&
            d.step !== this.state.tutSlide
          ) {
            this.setState({ tutSlide: d.step, tutAutoPlay: false });
          }
        };
        window.addEventListener("message", this._guideReadyL);
      }
      const frames = this._tutFrames;
      if (!frames) return;
      const st = this.state || {};
      const slides = (st.tutorials || []).map((s) => ({
        id: s.id,
        spot: s.spot || "",
        title: s.title || "",
        desc: s.desc || "",
      }));
      const lang = typeof this.cxLang === "function" ? this.cxLang() : "th";
      const maxStep = Math.max(0, slides.length - 1);
      const step = Math.min(Math.max(0, st.tutSlide || 0), maxStep);
      const post = (el, payload) => {
        try {
          if (el && el.contentWindow)
            el.contentWindow.postMessage(payload, "*");
        } catch (e) {}
      };
      if (frames.main)
        post(frames.main, {
          type: "cx-guide-sync",
          slides,
          step,
          lang,
          draft: null,
        });
      if (Array.isArray(frames.thumbs)) {
        for (let ti = 0; ti < slides.length; ti++) {
          const tf = frames.thumbs[ti];
          if (tf)
            post(tf, {
              type: "cx-guide-sync",
              slides,
              step: ti,
              lang,
              draft: null,
            });
        }
      }
      if (frames.modal && st.modal === "tut_preview")
        post(frames.modal, {
          type: "cx-guide-sync",
          slides,
          step,
          lang,
          draft: null,
        });
      if (frames.drawer && st.modal === "tut") {
        post(frames.drawer, {
          type: "cx-guide-sync",
          slides,
          step,
          lang,
          draft: {
            editId: st.tutEditId || "",
            spot: st.tutSpot || "promo",
            title: st.tutTitle || "",
            desc: st.tutDesc || "",
          },
        });
      }
    }
    componentWillUnmount() {
      clearTimeout(this._toastT);
      clearInterval(this._tutT);
      clearInterval(this._rtT);
      if (this._rtStorageL && typeof window !== "undefined")
        window.removeEventListener("storage", this._rtStorageL);
      if (this._guideReadyL && typeof window !== "undefined")
        window.removeEventListener("message", this._guideReadyL);
    }
    tutImg(kind) {
      const T = {
        promo:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340"><rect width="640" height="340" fill="#18181D"/><rect x="76" y="42" width="488" height="164" rx="28" fill="#146C3E" stroke="#FFFFFF" stroke-width="4"/><rect x="108" y="72" width="120" height="28" rx="14" fill="rgba(255,255,255,0.2)"/><text x="108" y="138" font-family="sans-serif" font-size="30" font-weight="800" fill="#FFFFFF">โปรโมชัน &amp; สิทธิพิเศษ</text><circle cx="495" cy="124" r="46" fill="none" stroke="#FFFFFF" stroke-width="5" opacity="0.25"/><rect x="76" y="226" width="488" height="72" rx="18" fill="#2A2A32"/><circle cx="114" cy="262" r="18" fill="#FC3901"/><text x="114" y="268" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">1</text><text x="148" y="268" font-family="sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">Coach Mark · ไฮไลต์แบนเนอร์โปรโมชัน</text></svg>',
        actions:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340"><rect width="640" height="340" fill="#18181D"/><rect x="76" y="40" width="488" height="142" rx="24" fill="#FFFFFF" stroke="#FC3901" stroke-width="4"/><text x="104" y="76" font-family="sans-serif" font-size="20" font-weight="800" fill="#1F1F1F">ช่องทางติดต่อ</text><rect x="104" y="94" width="136" height="68" rx="16" fill="#FFF1EB"/><text x="172" y="135" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="#C42D00">โทร</text><rect x="252" y="94" width="136" height="68" rx="16" fill="#E7F6EE"/><text x="320" y="135" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="700" fill="#146C3E">LINE</text><rect x="400" y="94" width="136" height="68" rx="16" fill="#F4F4F4"/><text x="468" y="135" text-anchor="middle" font-family="sans-serif" font-size="19" font-weight="700" fill="#3A3A3A">แชทกับเรา</text><rect x="76" y="206" width="488" height="84" rx="18" fill="#2A2A32"/><circle cx="114" cy="248" r="18" fill="#FC3901"/><text x="114" y="254" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">2</text><text x="148" y="254" font-family="sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">Coach Mark · ช่องทางติดต่อ &amp; ศูนย์ช่วยเหลือ</text></svg>',
        charge:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340"><rect width="640" height="340" fill="#18181D"/><rect x="76" y="42" width="488" height="108" rx="18" fill="#2A2A32"/><circle cx="114" cy="96" r="18" fill="#FC3901"/><text x="114" y="102" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">3</text><text x="148" y="102" font-family="sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">Coach Mark · ปุ่มการชาร์จ (กลางเมนู)</text><rect x="242" y="182" width="156" height="120" rx="28" fill="#232329" stroke="#FFFFFF" stroke-width="4"/><circle cx="320" cy="236" r="36" fill="#FC3901" stroke="#FFFFFF" stroke-width="5"/><path d="M324 214l-18 26h14l-3 18 19-26h-14z" fill="#FFFFFF"/></svg>',
        topbar:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340"><rect width="640" height="340" fill="#18181D"/><rect x="330" y="42" width="234" height="92" rx="22" fill="#232329" stroke="#FFFFFF" stroke-width="4"/><circle cx="394" cy="88" r="26" fill="#FFFFFF"/><circle cx="498" cy="88" r="26" fill="#FFFFFF"/><circle cx="516" cy="70" r="7" fill="#FC3901"/><rect x="76" y="176" width="488" height="110" rx="18" fill="#2A2A32"/><circle cx="114" cy="231" r="18" fill="#FC3901"/><text x="114" y="237" text-anchor="middle" font-family="sans-serif" font-size="16" font-weight="800" fill="#FFFFFF">4</text><text x="148" y="237" font-family="sans-serif" font-size="20" font-weight="700" fill="#FFFFFF">Coach Mark · กระดิ่งแจ้งเตือน &amp; โหมดมืด</text></svg>',
        map: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340"><rect width="640" height="340" fill="#EEF4EC"/><path d="M0 240Q180 180 340 220T640 160L640 340L0 340Z" fill="#DCEBD9"/><path d="M60 80L580 280M120 320L480 40" stroke="#FFFFFF" stroke-width="26" stroke-linecap="round"/><circle cx="240" cy="145" r="32" fill="#146C3E"/><circle cx="240" cy="145" r="12" fill="#FFFFFF"/><circle cx="425" cy="195" r="38" fill="#FC3901"/><path d="M425 172l-13 20h10l-2 15 15-21h-10z" fill="#FFFFFF"/></svg>',
        qr: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340"><rect width="640" height="340" fill="#19191D"/><rect x="235" y="42" width="170" height="256" rx="28" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="6"/><rect x="270" y="224" width="100" height="36" rx="10" fill="#FC3901"/></svg>',
        wallet:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340"><rect width="640" height="340" fill="#F4F5F7"/><rect x="90" y="62" width="460" height="216" rx="28" fill="#1F1F1F"/><rect x="124" y="96" width="130" height="32" rx="10" fill="#D4AF37"/><text x="124" y="196" font-family="sans-serif" font-size="44" font-weight="800" fill="#FFFFFF">Charge X Wallet</text></svg>',
      };
      return (
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(T[kind] || T.promo)
      );
    }
    seedTutorials() {
      return [
        {
          id: "t1",
          spot: "promo",
          title: "โปรโมชันและสิทธิพิเศษ",
          desc: "ปัดซ้ายขวาเพื่อดูโปรโมชันล่าสุดและสิทธิพิเศษสำหรับสมาชิก",
          img: this.tutImg("promo"),
        },
        {
          id: "t2",
          spot: "actions",
          title: "ช่องทางติดต่อและช่วยเหลือ",
          desc: "ติดต่อเจ้าหน้าที่ได้ทันทีผ่านโทร 24 ชม., LINE หรือแชท พร้อมเข้าศูนย์ช่วยเหลือได้จากหน้าหลัก",
          img: this.tutImg("actions"),
        },
        {
          id: "t3",
          spot: "charge",
          title: "ปุ่มการชาร์จ",
          desc: "ปุ่มตรงกลางเมนูด้านล่าง กดแล้วเปิดกล้องสแกน QR ที่ตู้ชาร์จได้เลย",
          img: this.tutImg("charge"),
        },
        {
          id: "t4",
          spot: "topbar",
          title: "แจ้งเตือนและโหมดมืด",
          desc: "ดูการแจ้งเตือนสถานะการชาร์จ และสลับโหมดสว่าง/มืดได้จากมุมขวาบน",
          img: this.tutImg("topbar"),
        },
      ];
    }
    avatarPresetUrl(kind) {
      const S = {
        admin:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="60" fill="#FC3901"/><circle cx="60" cy="46" r="22" fill="#FFFFFF"/><path d="M24 106c4-22 18-32 36-32s32 10 36 32" fill="#FFFFFF"/></svg>',
        op: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="60" fill="#1F1F1F"/><circle cx="60" cy="46" r="22" fill="#F7D774"/><path d="M24 106c4-22 18-32 36-32s32 10 36 32" fill="#F7D774"/></svg>',
        green:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="60" fill="#146C3E"/><circle cx="60" cy="46" r="22" fill="#FFFFFF"/><path d="M24 106c4-22 18-32 36-32s32 10 36 32" fill="#5AD49B"/></svg>',
        tech: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" rx="60" fill="#2C2C31"/><circle cx="60" cy="46" r="22" fill="#FF9470"/><path d="M24 106c4-22 18-32 36-32s32 10 36 32" fill="#E4E4E7"/></svg>',
      };
      return (
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(S[kind] || S.admin)
      );
    }
    fmtDocSections(arr) {
      return (Array.isArray(arr) ? arr : [])
        .map(([h, p]) => String(h || "") + " :: " + String(p || ""))
        .join("\n");
    }
    parseDocSections(txt) {
      return String(txt || "")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line, i) => {
          const idx = line.indexOf("::");
          return idx >= 0
            ? [line.slice(0, idx).trim(), line.slice(idx + 2).trim()]
            : ["ข้อที่ " + (i + 1), line];
        });
    }
    buildLegalItems(secs, secsEn) {
      const enArr = Array.isArray(secsEn) ? secsEn : [];
      return (Array.isArray(secs) ? secs : []).map((s, i) => ({
        h: (s && s[0]) || "",
        p: (s && s[1]) || "",
        hEn: (enArr[i] && enArr[i][0]) || "",
        pEn: (enArr[i] && enArr[i][1]) || "",
      }));
    }
    seedTerms() {
      return {
        title: "ข้อกำหนดการให้บริการ Charge X",
        titleEn: "Charge X Terms of Service",
        version: "2.4",
        effectiveDate: "2026-11-17",
        forceReconsent: false,
        sections: [
          [
            "1. การใช้บริการ",
            "ผู้ใช้ต้องมีอายุ 18 ปีขึ้นไป ให้ข้อมูลที่ถูกต้อง และใช้ตู้ชาร์จตามคำแนะนำที่ตู้และในแอป",
          ],
          [
            "2. ค่าบริการและการชำระเงิน",
            "ค่าบริการคิดตามพลังงานที่ได้รับ (kWh) ตามอัตราที่แสดงในแอปก่อนเริ่มชาร์จ ชำระผ่านกระเป๋าเงิน บัตร หรือช่องทางที่รองรับ",
          ],
          [
            "3. ค่าจอดเกินเวลา",
            "คิด ฿5/นาที หลังตัดการชาร์จและให้เวลาย้ายรถอีก 5 นาทีแล้ว แต่รถยังจอดอยู่ที่ช่องชาร์จ",
          ],
          [
            "4. ยอดค้างชำระ",
            "หากชำระไม่สำเร็จ ยอดจะถูกบันทึกเป็นยอดค้างชำระ และต้องชำระภายใน 24 ชม. ก่อนเริ่มชาร์จครั้งถัดไป",
          ],
        ],
        sectionsEn: [
          [
            "1. Service Eligibility",
            "Users must be 18 or older, provide accurate details, and follow charger instructions.",
          ],
          [
            "2. Fees & Payment",
            "Charges are calculated per kWh delivered as displayed in-app before session start via Wallet or card.",
          ],
          [
            "3. Idle Overtime Fee",
            "THB 5/min applies after charging finishes and the 5-minute vehicle removal grace period expires.",
          ],
          [
            "4. Overdue Balance",
            "Failed payments become overdue balance and must be settled within 24 hours before next session.",
          ],
        ],
      };
    }
    seedPrivacy() {
      return {
        title: "นโยบายความเป็นส่วนตัว Charge X (PDPA)",
        titleEn: "Charge X Privacy Policy (PDPA)",
        version: "2.4",
        effectiveDate: "2026-11-17",
        dpo: "dpo@chargex.co.th · Charge X (Thailand)",
        forceReconsent: false,
        sections: [
          [
            "1. ข้อมูลที่เราเก็บ",
            "ชื่อ เบอร์โทรศัพท์ อีเมล ข้อมูลรถ ตำแหน่งที่ตั้ง (เมื่อคุณอนุญาต) ประวัติการชาร์จ และข้อมูลการชำระเงิน",
          ],
          [
            "2. วัตถุประสงค์การใช้ข้อมูล",
            "เพื่อให้บริการชาร์จ เรียกเก็บค่าบริการ ออกใบเสร็จ ดูแลความปลอดภัย และส่งข่าวสารเมื่อยินยอม",
          ],
          [
            "3. สิทธิของเจ้าของข้อมูล (PDPA)",
            "มีสิทธิขอเข้าถึง ขอสำเนา แก้ไข ลบ และถอนความยินยอมได้ทุกเมื่อผ่านแอปหรือติดต่อ DPO",
          ],
        ],
        sectionsEn: [
          [
            "1. Personal Data Collected",
            "Name, phone number, email, EV vehicle profile, permitted GPS location, sessions, and billing history.",
          ],
          [
            "2. Processing Purpose",
            "To provide EV charging, collect fees, issue e-tax receipts, maintain security, and send opted-in updates.",
          ],
          [
            "3. Data Subject Rights (PDPA)",
            "Right to access, copy, rectify, erase, or withdraw consent anytime via the app or DPO contact.",
          ],
        ],
      };
    }
    seedPermPolicy() {
      return {
        allowViewWallet: true,
        allowExportReports: true,
        allowAccessLogs: true,
        enforceCorpEmail: true,
        allowSelfProfileEdit: true,
      };
    }
    seedCategories() {
      return [
        {
          id: "cat1",
          group: "news",
          name: "ข่าวสาร",
          nameEn: "News & Updates",
          desc: "อัปเดตและแจ้งเตือน",
          status: "active",
        },
        {
          id: "cat2",
          group: "news",
          name: "โปรโมชัน",
          nameEn: "Promotions",
          desc: "โปรโมชันและส่วนลดค่าชาร์จ",
          status: "active",
        },
        {
          id: "cat3",
          group: "news",
          name: "สถานีใหม่",
          nameEn: "New Stations",
          desc: "ข่าวเปิดสถานีใหม่และอัปเดต",
          status: "active",
        },
        {
          id: "cat4",
          group: "coupon",
          name: "Membership",
          nameEn: "Membership Perks",
          desc: "สิทธิประโยชน์แพ็กเกจรายเดือน",
          status: "active",
        },
        {
          id: "cat5",
          group: "station",
          name: "DC Fast 150 kW",
          nameEn: "DC Fast 150 kW",
          desc: "ชาร์จเร็ว DC ความเร็วสูง",
          status: "active",
        },
      ];
    }
    permDefs() {
      return [
        ["dashboard", "แผงบริหาร"],
        ["operators", "จัดการผู้ใช้"],
        ["stations", "สถานีชาร์จ"],
        ["coupons", "คูปอง"],
        ["news", "ข่าวสาร"],
        ["monitor", "Monitor"],
        ["tutorial", "Tutorial"],
        ["payments", "การชำระเงิน"],
        ["reports", "รายงาน"],
        ["settings", "ตั้งค่าระบบ (Setting)"],
      ];
    }
    levelsFromPerms(perms, sup, existingLevels) {
      const arr = Array.isArray(perms) ? perms : [];
      const base =
        existingLevels && typeof existingLevels === "object"
          ? existingLevels
          : {};
      const out = {};
      this.permDefs().forEach(([id]) => {
        if (sup) {
          out[id] = "full";
          return;
        }
        if (arr.indexOf(id) >= 0) {
          out[id] = base[id] && base[id] !== "none" ? base[id] : "edit";
        } else {
          out[id] = "none";
        }
      });
      return out;
    }
    permsFromLevels(levels, sup) {
      const lv = levels && typeof levels === "object" ? levels : {};
      if (sup) return this.permDefs().map((p) => p[0]);
      return this.permDefs()
        .map((p) => p[0])
        .filter((id) => lv[id] && lv[id] !== "none");
    }
    normRole(r) {
      const x = Object.assign({}, r);
      const sup = x.baseRole === "super_admin";
      x.permLevels = this.levelsFromPerms(x.perms, sup, x.permLevels);
      x.perms = this.permsFromLevels(x.permLevels, sup);
      return x;
    }
    normTeam(t) {
      const defs = {
        tm_core: {
          lead: "วรพล ศิริวัฒน์",
          scope: "ทุกสถานีและระบบกลาง (Full Network)",
        },
        tm_ops: {
          lead: "ณัฐพงษ์ วงศ์ชัย",
          scope: "โปรโมชัน คูปอง และสื่อสารลูกค้ารวมทุกสาขา",
        },
        tm_mon: {
          lead: "กัญญา รัตนสุข",
          scope: "ม.รามฯ บางนา · เมกา บางนา · กิ่งแก้ว กม.9 · ลาซาล",
        },
        tm_mem: {
          lead: "สวรรยา ใจดี (Fleet Lead)",
          scope: "สมาชิกแอปพลิเคชัน Charge X และลูกค้าองค์กร Fleet",
        },
      };
      const d = defs[t.id] || {};
      return Object.assign(
        {
          lead: d.lead || "ยังไม่ได้ระบุหัวหน้าทีม",
          scope: d.scope || t.desc || "ทุกพื้นที่ที่รับผิดชอบ",
        },
        t,
      );
    }
    seedRoles() {
      return [
        {
          id: "role_super",
          name: "Super Admin",
          baseRole: "super_admin",
          desc: "ผู้ดูแลระบบสูงสุด · เข้าถึงได้ทุกโมดูล (จำกัด 1 User ID)",
          perms: this.permDefs().map((p) => p[0]),
          permLevels: this.levelsFromPerms(null, true),
          systemLocked: true,
        },
        {
          id: "role_op",
          name: "Operator",
          baseRole: "operator",
          desc: "ผู้ปฏิบัติการ · คูปอง ข่าวสาร และ Monitor (อีเมล @chargex.co.th)",
          perms: ["coupons", "news", "monitor"],
          permLevels: this.levelsFromPerms(
            ["coupons", "news", "monitor"],
            false,
            { coupons: "edit", news: "edit", monitor: "full" },
          ),
          systemLocked: true,
        },
        {
          id: "role_support",
          name: "Promo & Station Support",
          baseRole: "operator",
          desc: "ดูแลคูปอง ข่าวสาร และติดตามสถานะสถานีชาร์จ",
          perms: ["coupons", "news", "monitor"],
          permLevels: this.levelsFromPerms(
            ["coupons", "news", "monitor"],
            false,
            { coupons: "edit", news: "edit", monitor: "view" },
          ),
          systemLocked: false,
        },
      ];
    }
    seedTeams() {
      return [
        {
          id: "tm_core",
          name: "Core Platform Team",
          lead: "วรพล ศิริวัฒน์",
          scope: "ทุกสถานีและระบบกลาง (Full Network)",
          desc: "ทีมผู้ดูแลหลักและโครงสร้างระบบ Charge X",
        },
        {
          id: "tm_ops",
          name: "Operations & Marketing",
          lead: "ณัฐพงษ์ วงศ์ชัย",
          scope: "โปรโมชัน คูปอง และสื่อสารลูกค้ารวมทุกสาขา",
          desc: "ทีมดูแลโปรโมชัน คูปอง และสื่อสารลูกค้า",
        },
        {
          id: "tm_mon",
          name: "Station Monitoring Team",
          lead: "กัญญา รัตนสุข",
          scope: "ม.รามฯ บางนา · เมกา บางนา · กิ่งแก้ว กม.9 · ลาซาล",
          desc: "ทีมตรวจสอบและบำรุงรักษาตู้ชาร์จ 24 ชม.",
        },
        {
          id: "tm_mem",
          name: "EV Driver & Fleet Group",
          lead: "สวรรยา ใจดี (Fleet Lead)",
          scope: "สมาชิกแอปพลิเคชัน Charge X และลูกค้าองค์กร Fleet",
          desc: "กลุ่มผู้ใช้งานรถยนต์ไฟฟ้าและสมาชิก Fleet",
        },
      ];
    }
    normAdminUser(u, roles) {
      const x = Object.assign({}, u);
      const sup = x.role === "super_admin";
      const rObj =
        (roles || []).find((r) => r.id === x.roleId) ||
        (roles || []).find(
          (r) => r.baseRole === (sup ? "super_admin" : "operator"),
        );
      x.roleId = x.roleId || (rObj ? rObj.id : sup ? "role_super" : "role_op");
      x.roleName =
        x.roleName || (rObj ? rObj.name : sup ? "Super Admin" : "Operator");
      x.team =
        x.team || (sup ? "Core Platform Team" : "Operations & Marketing");
      x.phone = x.phone || "081-200-0000";
      x.avatar = x.avatar || this.avatarPresetUrl(sup ? "admin" : "op");
      x.perms = sup
        ? this.permDefs().map((p) => p[0])
        : Array.isArray(x.perms) && x.perms.length
          ? x.perms.slice()
          : rObj && rObj.perms
            ? rObj.perms.slice()
            : ["coupons", "news", "monitor"];
      x.status = sup
        ? "active"
        : x.status === "inactive" || x.status === "suspended"
          ? "inactive"
          : "active";
      return x;
    }
    seedUsers() {
      return [
        {
          id: "u1",
          role: "super_admin",
          roleId: "role_super",
          roleName: "Super Admin",
          username: "superadmin",
          email: "superadmin@chargex.co.th",
          name: "วรพล ศิริวัฒน์",
          phone: "081-100-0001",
          dept: "Head of Platform",
          team: "Core Platform Team",
          avatar: this.avatarPresetUrl("admin"),
          perms: this.permDefs().map((p) => p[0]),
          status: "active",
          password: "Admin@1234",
          lastLogin: "วันนี้ · 09:15",
        },
        {
          id: "u2",
          role: "operator",
          roleId: "role_op",
          roleName: "Operator",
          username: "nattapong@chargex.co.th",
          email: "nattapong@chargex.co.th",
          name: "ณัฐพงษ์ วงศ์ชัย",
          phone: "081-200-0002",
          dept: "Operations & Marketing",
          team: "Operations & Marketing",
          avatar: this.avatarPresetUrl("op"),
          perms: ["coupons", "news", "monitor"],
          status: "active",
          password: "Op@123456",
          lastLogin: "วันนี้ · 10:40",
        },
        {
          id: "u3",
          role: "operator",
          roleId: "role_op",
          roleName: "Operator",
          username: "kanya@chargex.co.th",
          email: "kanya@chargex.co.th",
          name: "กัญญา รัตนสุข",
          phone: "081-300-0003",
          dept: "Station Monitoring",
          team: "Station Monitoring Team",
          avatar: this.avatarPresetUrl("tech"),
          perms: ["coupons", "news", "monitor"],
          status: "active",
          password: "Kanya#2026",
          lastLogin: "เมื่อวาน · 17:20",
        },
      ];
    }
    seedCoupons() {
      const today = this.todayIso();
      return [
        {
          id: "c1",
          code: "EV50",
          kind: "charge",
          discType: "flat",
          discUnit: "flat",
          discVal: 50,
          minSpend: 150,
          maxDisc: 50,
          usageType: "สินค้าและบริการ",
          totalQty: 1000,
          usedQty: 248,
          perUserLimit: 1,
          startDate: today,
          endDate: "2026-12-31",
          stackable: false,
          newUserOnly: false,
          title: "ลดค่าชาร์จ ฿50",
          cond: "เมื่อชาร์จตั้งแต่ ฿150 ขึ้นไป · ทุกสถานี",
          exp: "หมดอายุ 31 ธ.ค. 2569",
          status: "avail",
        },
        {
          id: "c2",
          code: "DC25",
          kind: "charge",
          discType: "pct",
          discUnit: "pct",
          discVal: 25,
          minSpend: 100,
          maxDisc: 60,
          usageType: "สินค้าและบริการ",
          totalQty: 800,
          usedQty: 190,
          perUserLimit: 2,
          startDate: today,
          endDate: "2026-12-31",
          stackable: true,
          newUserOnly: false,
          title: "ส่วนลดค่าชาร์จ DC 25%",
          cond: "ลดสูงสุด ฿60 · ชาร์จขั้นต่ำ ฿100 สำหรับหัวชาร์จ DC",
          exp: "หมดอายุ 31 ธ.ค. 2569",
          status: "avail",
        },
        {
          id: "c5",
          code: "MEM20",
          kind: "charge",
          discType: "pct",
          discUnit: "pct",
          discVal: 20,
          minSpend: 199,
          maxDisc: 120,
          usageType: "Membership",
          totalQty: 300,
          usedQty: 64,
          perUserLimit: 2,
          startDate: today,
          endDate: "2027-01-31",
          stackable: true,
          newUserOnly: false,
          title: "ส่วนลดสมาชิก Membership 20%",
          cond: "ลดสูงสุด ฿120 · ใช้กับแพ็กเกจ Membership และค่าชาร์จรายเดือน",
          exp: "หมดอายุ 31 ม.ค. 2570",
          status: "avail",
        },
        {
          id: "c3",
          code: "TOPUP100",
          kind: "topup",
          discType: "bonus",
          discUnit: "flat",
          discVal: 50,
          minSpend: 300,
          maxDisc: 50,
          usageType: "เติมเงิน Wallet",
          totalQty: 600,
          usedQty: 112,
          perUserLimit: 3,
          startDate: today,
          endDate: "2027-01-15",
          stackable: false,
          newUserOnly: false,
          title: "เติมเงิน ฿300 รับโบนัส ฿50",
          cond: "รับเครดิตเพิ่มเข้ากระเป๋าเมื่อเติมผ่าน PromptPay / บัตร",
          exp: "หมดอายุ 15 ม.ค. 2570",
          status: "avail",
        },
        {
          id: "c4",
          code: "CASH30",
          kind: "credit",
          discType: "credit",
          discUnit: "flat",
          discVal: 30,
          minSpend: 0,
          maxDisc: 30,
          usageType: "สินค้าและบริการ",
          totalQty: 500,
          usedQty: 185,
          perUserLimit: 1,
          startDate: today,
          endDate: "2026-12-31",
          stackable: false,
          newUserOnly: true,
          title: "โบนัสสมาชิกใหม่ รับเครดิต ฿30",
          cond: "กดรับเข้ากระเป๋าเงิน Charge X ได้ทันที ไม่มีขั้นต่ำ",
          exp: "หมดอายุ 31 ธ.ค. 2569",
          status: "avail",
        },
      ];
    }
    seedNews() {
      return [
        {
          id: "nw1",
          tag: "โปรโมชัน",
          title: "ชาร์จช่วง Off-Peak 22:00–06:00 ลดทันที 10%",
          date: "15 พ.ย. – 31 ธ.ค. 2569",
          status: "published",
          sendMode: "now",
          schedDate: "",
          schedTime: "",
          body: "สำหรับสมาชิก Charge X ทุกท่านที่ชาร์จหัว DC ช่วงกลางคืน",
        },
        {
          id: "nw2",
          tag: "สถานีใหม่",
          title: "เปิดสถานีใหม่ ม.รามคำแหง วิทยาเขต บางนา 4 หัวชาร์จ 150 kW",
          date: "10 พ.ย. 2569",
          status: "published",
          sendMode: "now",
          schedDate: "",
          schedTime: "",
          body: "รองรับ CCS2 และ Auto Charge พร้อมจุดพักรถตลอด 24 ชม.",
        },
        {
          id: "nw3",
          tag: "ข่าวสาร",
          title: "แจ้งข่าวสาร: ขยายจุดบริการชาร์จเร็ว 180 kW เส้นบางนา-ตราด",
          date: "ตั้งเวลา 25 พ.ย. 2569 · 09:00",
          status: "published",
          sendMode: "scheduled",
          schedDate: "2026-11-25",
          schedTime: "09:00",
          body: "เปิดให้จองช่องชาร์จล่วงหน้าผ่านแอป Charge X ตั้งแต่สัปดาห์หน้าเป็นต้นไป",
        },
        {
          id: "nw4",
          tag: "ประกาศ",
          title: "แจ้งปรับปรุงระบบเชื่อมต่อธนาคารประจำเดือน",
          date: "ตั้งเวลา 28 พ.ย. 2569 · 01:30",
          status: "draft",
          sendMode: "scheduled",
          schedDate: "2026-11-28",
          schedTime: "01:30",
          body: "ปิดปรับปรุงช่องทาง Mobile Banking ชั่วคราว 30 นาที เวลา 02:00–02:30 น.",
        },
      ];
    }
    seedMonitors() {
      return [
        {
          id: "m1",
          station: "มหาวิทยาลัยรามคำแหง วิทยาเขต บางนา",
          bay: "เครื่อง #4041",
          power: "150 kW DC",
          status: "charging",
          load: "118 kW · 73%",
          car: "Chery Q",
        },
        {
          id: "m2",
          station: "เมกา บางนา (ลานจอด P3)",
          bay: "เครื่อง #2018",
          power: "120 kW DC",
          status: "online",
          load: "ว่าง 2 จาก 2 หัว",
          car: "พร้อมให้บริการ",
        },
        {
          id: "m3",
          station: "ไบเทค บางนา (อาคาร 2)",
          bay: "เครื่อง #3092",
          power: "22 kW AC",
          status: "maint",
          load: "บำรุงรักษาตามรอบ",
          car: "ปิดใช้งานชั่วคราว",
        },
        {
          id: "m4",
          station: "ถนนกิ่งแก้ว กม.9",
          bay: "เครื่อง #1055",
          power: "150 kW DC",
          status: "online",
          load: "ว่าง 1 จาก 2 หัว",
          car: "รอรับรถ",
        },
      ];
    }
    stImgPresetUrl(kind) {
      const S = {
        fast: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260"><rect width="600" height="260" fill="#F4F5F7"/><path d="M0 195h600v65H0z" fill="#1F1F1F"/><rect x="130" y="55" width="90" height="140" rx="14" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="4"/><rect x="148" y="75" width="54" height="44" rx="8" fill="#FFF1EB"/><rect x="160" y="135" width="30" height="42" rx="6" fill="#FC3901"/><rect x="260" y="55" width="90" height="140" rx="14" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="4"/><rect x="278" y="75" width="54" height="44" rx="8" fill="#E7F6EE"/><rect x="290" y="135" width="30" height="42" rx="6" fill="#146C3E"/><rect x="390" y="110" width="120" height="75" rx="16" fill="#FC3901"/><text x="412" y="155" font-family="sans-serif" font-size="22" font-weight="800" fill="#FFFFFF">150 kW DC</text></svg>',
        mall: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260"><rect width="600" height="260" fill="#EEF4EC"/><rect x="55" y="38" width="490" height="160" rx="22" fill="#FFFFFF" stroke="#D4D4D4" stroke-width="4"/><rect x="90" y="68" width="150" height="100" rx="12" fill="#F6F6F6"/><circle cx="330" cy="118" r="36" fill="#FC3901"/><path d="M332 95l-15 24h12l-2 18 16-25h-12z" fill="#FFFFFF"/><text x="385" y="114" font-family="sans-serif" font-size="22" font-weight="700" fill="#1F1F1F">Mall EV Zone</text><text x="385" y="142" font-family="sans-serif" font-size="15" fill="#146C3E">Parking P3 · Open 24h</text></svg>',
        highway:
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 260"><rect width="600" height="260" fill="#FFF7F3"/><path d="M0 175Q280 140 600 185L600 260H0Z" fill="#2C2C31"/><path d="M40 218h90M170 218h90M300 218h90M430 218h90" stroke="#F7D774" stroke-width="6" stroke-linecap="round"/><rect x="150" y="48" width="300" height="96" rx="20" fill="#1F1F1F"/><circle cx="204" cy="96" r="24" fill="#FC3901"/><path d="M206 82l-10 16h8l-2 12 12-17h-8z" fill="#FFFFFF"/><text x="242" y="92" font-family="sans-serif" font-size="22" font-weight="800" fill="#FFFFFF">Highway Hub</text><text x="242" y="116" font-family="sans-serif" font-size="14" fill="#5AD49B">180 kW Ultra Fast</text></svg>',
      };
      return (
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(S[kind] || S.fast)
      );
    }
    seedStations() {
      return [
        {
          id: "st1",
          code: "STN-001",
          monId: "m1",
          name: "มหาวิทยาลัยรามคำแหง วิทยาเขต บางนา",
          nameEn: "Ramkhamhaeng Univ. Bangna",
          area: "เขตบางนา · เปิด 24 ชม.",
          owner: "บริษัท ชาร์จ เอ็กซ์ (ประเทศไทย) จำกัด",
          contractType: "ลงทุนเอง 100%",
          ownerCategory: "chargex",
          ownerTaxId: "0105564008912",
          hours: "เปิด 24 ชม.",
          address: "282 ถ.บางนา-ตราด แขวงดอกไม้ เขตประเวศ กทม. 10250",
          lat: "13.6682",
          lng: "100.6845",
          mapUrl: "https://www.google.com/maps?q=13.6682,100.6845",
          contactName: "คุณเอกรินทร์ เขตบางนา",
          contactPhone: "081-990-4100 · LINE @cx-bangna",
          img: "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
          power: "150 kW DC · 4 หัว",
          chargerCount: 2,
          totalBays: 4,
          freeBays: 2,
          status: "charging",
          faultCount: 3,
          lastFaultDate: "12 พ.ย. 2569",
          faultDetail: "หัวชาร์จ B แจ้งเตือนแรงดันไฟฟ้าแกว่ง · แก้ไขแล้ว",
          uptimePct: 98.5,
          share: 0.21,
        },
        {
          id: "st2",
          code: "STN-002",
          monId: "m2",
          name: "เมกา บางนา (ลานจอด P3)",
          nameEn: "Mega Bangna (Parking P3)",
          area: "บางพลี · ลานจอดห้าง",
          owner: "พันธมิตร สยามรีเทล จำกัด",
          contractType: "Revenue Sharing",
          ownerCategory: "retail",
          ownerTaxId: "0115554003190",
          hours: "10:00–22:00 น.",
          address: "39 หมู่ 6 ถ.เทพรัตน ต.บางแก้ว อ.บางพลี สมุทรปราการ 10540",
          lat: "13.6468",
          lng: "100.6805",
          mapUrl: "https://www.google.com/maps?q=13.6468,100.6805",
          contactName: "คุณศศิธร โซนบางพลี",
          contactPhone: "089-412-2201 · sasithorn@chargex.co.th",
          img: this.stImgPresetUrl("mall"),
          power: "120 kW DC · 4 หัว",
          chargerCount: 2,
          totalBays: 4,
          freeBays: 3,
          status: "online",
          faultCount: 1,
          lastFaultDate: "8 พ.ย. 2569",
          faultDetail:
            "เซ็นเซอร์ล็อกหัวชาร์จ DC ขัดข้อง 1 ครั้ง · เปลี่ยนอะไหล่แล้ว",
          uptimePct: 99.4,
          share: 0.17,
        },
        {
          id: "st3",
          code: "STN-003",
          monId: "m3",
          name: "ไบเทค บางนา (อาคาร 2)",
          nameEn: "BITEC Bangna (Hall 2)",
          area: "เขตบางนา · ศูนย์ประชุม",
          owner: "ไบเทค เอ็นเนอร์ยี่ พาร์ทเนอร์",
          contractType: "Revenue Sharing",
          ownerCategory: "retail",
          ownerTaxId: "0105538012904",
          hours: "07:00–23:00 น.",
          address: "88 ถ.เทพรัตน แขวงบางนาใต้ เขตบางนา กทม. 10260",
          lat: "13.6695",
          lng: "100.6088",
          mapUrl: "https://www.google.com/maps?q=13.6695,100.6088",
          contactName: "คุณธนพล ศูนย์ไบเทค",
          contactPhone: "086-771-9032 · LINE @cx-bitec",
          img: this.stImgPresetUrl("fast"),
          power: "22 kW AC · 2 หัว",
          chargerCount: 1,
          totalBays: 2,
          freeBays: 0,
          status: "maint",
          faultCount: 5,
          lastFaultDate: "17 พ.ย. 2569",
          faultDetail: "ตู้ชาร์จ AC เบรกเกอร์ทริประหว่างบำรุงรักษา",
          uptimePct: 93.2,
          share: 0.08,
        },
        {
          id: "st4",
          code: "STN-004",
          monId: "m4",
          name: "ถนนกิ่งแก้ว กม.9",
          nameEn: "King Kaew Rd. KM.9",
          area: "ลาดกระบัง-กิ่งแก้ว · 24 ชม.",
          owner: "บจก. กิ่งแก้ว อีวี ฮับ",
          contractType: "เช่าพื้นที่ / Partner",
          ownerCategory: "hub",
          ownerTaxId: "0115562004811",
          hours: "เปิด 24 ชม.",
          address: "99 ถ.กิ่งแก้ว ต.ราชาเทวะ อ.บางพลี สมุทรปราการ 10540",
          lat: "13.6812",
          lng: "100.7134",
          mapUrl: "https://www.google.com/maps?q=13.6812,100.7134",
          contactName: "คุณวิชัย เขตลาดกระบัง",
          contactPhone: "082-510-8834 · wichai@chargex.co.th",
          img: this.stImgPresetUrl("highway"),
          power: "150 kW DC · 2 หัว",
          chargerCount: 1,
          totalBays: 2,
          freeBays: 1,
          status: "online",
          faultCount: 2,
          lastFaultDate: "10 พ.ย. 2569",
          faultDetail: "ระบบระบายความร้อนสายไฟแจ้งเตือน · อัปเดตเฟิร์มแวร์แล้ว",
          uptimePct: 98.9,
          share: 0.13,
        },
        {
          id: "st5",
          code: "STN-005",
          monId: "",
          name: "บางนา-ตราด กม.4",
          nameEn: "Bangna-Trad KM.4 Hub",
          area: "เขตบางนา · จุดแวะพัก",
          owner: "บจก. บางนา ออโต้ พาวเวอร์",
          contractType: "เช่าพื้นที่ / Partner",
          ownerCategory: "hub",
          ownerTaxId: "0105561009945",
          hours: "เปิด 24 ชม.",
          address: "145 ถ.บางนา-ตราด กม.4 แขวงบางนา เขตบางนา กทม. 10260",
          lat: "13.6641",
          lng: "100.6339",
          mapUrl: "https://www.google.com/maps?q=13.6641,100.6339",
          contactName: "คุณนลินี สายบางนา-ตราด",
          contactPhone: "084-882-1515 · LINE @cx-bnkm4",
          img: this.stImgPresetUrl("highway"),
          power: "180 kW DC · 4 หัว",
          chargerCount: 2,
          totalBays: 4,
          freeBays: 2,
          status: "online",
          faultCount: 0,
          lastFaultDate: "ยังไม่มีเหตุขัดข้อง",
          faultDetail: "ไม่พบแจ้งขัดข้องในช่วง 30 วันที่ผ่านมา",
          uptimePct: 100.0,
          share: 0.14,
        },
        {
          id: "st6",
          code: "STN-006",
          monId: "",
          name: "เซ็นทรัล บางนา",
          nameEn: "Central Bangna EV Zone",
          area: "เขตบางนา · โซน EV",
          owner: "เซ็นทรัล พาร์ทเนอร์ อีวี",
          contractType: "Revenue Sharing",
          ownerCategory: "retail",
          ownerTaxId: "0107536000215",
          hours: "10:00–22:00 น.",
          address: "587-589 ถ.เทพรัตน แขวงบางนาเหนือ เขตบางนา กทม. 10260",
          lat: "13.6688",
          lng: "100.6330",
          mapUrl: "https://www.google.com/maps?q=13.6688,100.6330",
          contactName: "คุณปิติ โซนเซ็นทรัล",
          contactPhone: "091-224-7780 · piti@chargex.co.th",
          img: this.stImgPresetUrl("mall"),
          power: "120 kW DC · 4 หัว",
          chargerCount: 2,
          totalBays: 4,
          freeBays: 3,
          status: "online",
          faultCount: 1,
          lastFaultDate: "5 พ.ย. 2569",
          faultDetail: "แรงดันโหลดสลับเฟส 1 ครั้ง · ปกติแล้ว",
          uptimePct: 99.6,
          share: 0.11,
        },
        {
          id: "st7",
          code: "STN-007",
          monId: "",
          name: "ซีคอนสแควร์ ศรีนครินทร์",
          nameEn: "Seacon Square Srinakarin",
          area: "ประเวศ · ลานจอด B1",
          owner: "บจก. ซีคอน ศรีนครินทร์ โมบิลิตี้",
          contractType: "Revenue Sharing",
          ownerCategory: "retail",
          ownerTaxId: "0105531004418",
          hours: "10:30–21:30 น.",
          address: "55 ถ.ศรีนครินทร์ แขวงหนองบอน เขตประเวศ กทม. 10250",
          lat: "13.6941",
          lng: "100.6480",
          mapUrl: "https://www.google.com/maps?q=13.6941,100.6480",
          contactName: "คุณกานดา เขตประเวศ",
          contactPhone: "085-601-3391 · LINE @cx-seacon",
          img: this.stImgPresetUrl("mall"),
          power: "120 kW DC · 4 หัว",
          chargerCount: 2,
          totalBays: 4,
          freeBays: 4,
          status: "online",
          faultCount: 0,
          lastFaultDate: "ยังไม่มีเหตุขัดข้อง",
          faultDetail: "ไม่พบแจ้งขัดข้องในช่วง 30 วันที่ผ่านมา",
          uptimePct: 100.0,
          share: 0.1,
        },
        {
          id: "st8",
          code: "STN-008",
          monId: "",
          name: "สถานี ลาซาล-แบริ่ง",
          nameEn: "Lasalle-Bearing Station",
          area: "สุขุมวิท 105 · 24 ชม.",
          owner: "บริษัท ชาร์จ เอ็กซ์ (ประเทศไทย) จำกัด",
          contractType: "ลงทุนเอง 100%",
          ownerCategory: "chargex",
          ownerTaxId: "0105564008912",
          hours: "เปิด 24 ชม.",
          address: "1050 ซ.แบริ่ง-ลาซาล แขวงบางนาใต้ เขตบางนา กทม. 10260",
          lat: "13.6584",
          lng: "100.6195",
          mapUrl: "https://www.google.com/maps?q=13.6584,100.6195",
          contactName: "คุณอรุณ สุขุมวิท 105",
          contactPhone: "093-114-5090 · arun@chargex.co.th",
          img: this.stImgPresetUrl("fast"),
          power: "50 kW DC · 2 หัว",
          chargerCount: 1,
          totalBays: 2,
          freeBays: 2,
          status: "online",
          faultCount: 1,
          lastFaultDate: "2 พ.ย. 2569",
          faultDetail: "ระบบระบายความร้อนสายไฟแจ้งเตือน · อัปเดตเฟิร์มแวร์แล้ว",
          uptimePct: 99.1,
          share: 0.06,
        },
      ];
    }
    stationUnitsFor(s, monList) {
      if (Array.isArray(s.units) && s.units.length) return s.units;
      const mon = (monList || []).find((m) => m.id === s.monId);
      const cnt = Math.max(1, Number(s.chargerCount) || 1);
      const perSpec = String(s.power || "150 kW DC")
        .split("·")[0]
        .trim();
      const baseCode =
        s.monId === "m1"
          ? 4041
          : s.monId === "m2"
            ? 2018
            : s.monId === "m3"
              ? 3092
              : s.monId === "m4"
                ? 1055
                : 5100 + Math.abs(String(s.id || "0").charCodeAt(2) || 1);
      const out = [];
      for (let i = 0; i < cnt; i++) {
        const uStat =
          i === 0 && mon
            ? mon.status
            : s.status === "maint"
              ? "maint"
              : "online";
        out.push({
          id: (s.id || "st") + "_u" + (i + 1),
          code: i === 0 && mon ? mon.bay : "เครื่อง #" + (baseCode + i),
          power:
            perSpec +
            " · " +
            Math.max(1, Math.round((Number(s.totalBays) || cnt * 2) / cnt)) +
            " หัว",
          status: uStat,
          ocpp: uStat === "maint" ? "Maintenance Lock" : "OCPP 2.0.1 Connected",
        });
      }
      return out;
    }
    stationIncidentsFor(s) {
      if (Array.isArray(s.incidents) && s.incidents.length) return s.incidents;
      const fc = Number(s.faultCount) || 0;
      if (fc <= 0) return [];
      const items = [
        {
          id: "inc1",
          date: s.lastFaultDate || "12 พ.ย. 2569",
          issue: s.faultDetail || "แจ้งเตือนเซ็นเซอร์หัวชาร์จ",
          mttr: "38 นาที",
          state: s.status === "maint" ? "กำลังดำเนินการ" : "แก้ไขแล้ว",
        },
      ];
      if (fc >= 2)
        items.push({
          id: "inc2",
          date: "28 ต.ค. 2569",
          issue:
            "OCPP Heartbeat ขาดการเชื่อมต่อชั่วคราว · รีบูตเกตเวย์อัตโนมัติ",
          mttr: "12 นาที",
          state: "แก้ไขแล้ว",
        });
      if (fc >= 3)
        items.push({
          id: "inc3",
          date: "14 ต.ค. 2569",
          issue:
            "อุณหภูมิหัวชาร์จ DC เกินเกณฑ์ระหว่างพีคโหลด · ลดกระแสอัตโนมัติ",
          mttr: "45 นาที",
          state: "แก้ไขแล้ว",
        });
      return items;
    }
    buildStationsExcelXml(list, cfg) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const row = (cells, hdr) =>
        "<Row>" +
        cells
          .map(
            (c) =>
              "<Cell" +
              (hdr ? ' ss:StyleID="h"' : "") +
              '><Data ss:Type="' +
              (typeof c === "number" ? "Number" : "String") +
              '">' +
              esc(c) +
              "</Data></Cell>",
          )
          .join("") +
        "</Row>";
      const totChargers = list.reduce(
        (a, b) => a + (Number(b.chargerCount) || 1),
        0,
      );
      const totBays = list.reduce((a, b) => a + (Number(b.totalBays) || 2), 0);
      const totFaults = list.reduce(
        (a, b) => a + (Number(b.faultCount) || 0),
        0,
      );
      const s1 = [
        row(["หัวข้อสรุปสถานีชาร์จ EV", "ข้อมูล", "บริษัท / หน่วยงาน"], true),
        row(["จำนวนสถานีทั้งหมด", list.length, cfg.company]),
        row(["จำนวนตู้ชาร์จรวม", totChargers, totBays + " หัวชาร์จ"]),
        row(["สถิติแจ้งระบบขัดข้องสะสม", totFaults, "รวมทุกสถานี"]),
      ];
      const s2 = [
        row(
          [
            "รหัสสถานี",
            "ชื่อสถานีชาร์จ",
            "เจ้าของสถานี",
            "ประเภทสัญญา",
            "ที่อยู่",
            "พิกัด Lat",
            "พิกัด Lng",
            "Google Map URL",
            "ผู้ดูแลพื้นที่",
            "ช่องทางติดต่อ",
            "จำนวนตู้ชาร์จ",
            "หัวชาร์จ",
            "กำลังไฟ",
            "แจ้งขัดข้อง (ครั้ง)",
            "วันที่ขัดข้องล่าสุด",
            "รายละเอียดขัดข้อง",
            "สถานะ",
          ],
          true,
        ),
      ].concat(
        list.map((s) =>
          row([
            s.code || s.id,
            s.name,
            s.owner,
            s.contractType || "ลงทุนเอง 100%",
            s.address,
            s.lat,
            s.lng,
            s.mapUrl,
            s.contactName,
            s.contactPhone,
            Number(s.chargerCount) || 1,
            Number(s.totalBays) || 2,
            s.power,
            Number(s.faultCount) || 0,
            s.lastFaultDate,
            s.faultDetail,
            s.status,
          ]),
        ),
      );
      return (
        '<?xml version="1.0" encoding="UTF-8"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="h"><Font ss:Bold="1"/></Style></Styles><Worksheet ss:Name="Summary"><Table>' +
        s1.join("") +
        '</Table></Worksheet><Worksheet ss:Name="Stations"><Table>' +
        s2.join("") +
        "</Table></Worksheet></Workbook>"
      );
    }
    buildStationsPdfHtml(list, cfg) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const totChargers = list.reduce(
        (a, b) => a + (Number(b.chargerCount) || 1),
        0,
      );
      const totFaults = list.reduce(
        (a, b) => a + (Number(b.faultCount) || 0),
        0,
      );
      const rows = list
        .map(
          (s) =>
            "<tr><td><strong>" +
            esc(s.code || s.id) +
            " · " +
            esc(s.name) +
            "</strong><br><small>" +
            esc(s.power) +
            "</small></td><td>" +
            esc(s.owner) +
            "<br><small>" +
            esc(s.contractType || "ลงทุนเอง 100%") +
            "</small></td><td>" +
            esc(s.address) +
            "<br><small>Map: " +
            esc(s.lat + "," + s.lng) +
            "</small></td><td>" +
            esc(s.contactName + " (" + s.contactPhone + ")") +
            "</td><td>" +
            (Number(s.chargerCount) || 1) +
            " ตู้ / " +
            (Number(s.totalBays) || 2) +
            " หัว</td><td>" +
            (Number(s.faultCount) || 0) +
            " ครั้ง<br><small>" +
            esc(s.lastFaultDate) +
            "</small></td><td>" +
            esc(s.status) +
            "</td></tr>",
        )
        .join("");
      return (
        '<!doctype html><html lang="th"><head><meta charset="utf-8"><title>Charge X Stations Report</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:Sarabun,"Segoe UI",sans-serif;color:#1F1F1F;margin:0;padding:14px}h1{margin:0 0 4px;font-size:19px;color:#FC3901}p{margin:0 0 10px;font-size:12px;color:#5C5C5C}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border:1px solid #E0E0E0;padding:6px 7px;text-align:left;vertical-align:top}th{background:#F6F6F6}</style></head><body><h1>Charge X — รายงานข้อมูลสถานีชาร์จไฟฟ้ารถยนต์ (Station Management)</h1><p>' +
        esc(cfg.company) +
        " | สถานีทั้งหมด " +
        list.length +
        " แห่ง | ตู้ชาร์จรวม " +
        totChargers +
        " ตู้ | สถิติขัดข้องสะสม " +
        totFaults +
        " ครั้ง</p><table><tr><th>สถานีชาร์จ / กำลังไฟ</th><th>เจ้าของสถานี</th><th>ที่อยู่ &amp; พิกัด Google Map</th><th>ผู้ดูแลประจำพื้นที่</th><th>จำนวนตู้/หัว</th><th>สถิติขัดข้อง</th><th>สถานะ</th></tr>" +
        rows +
        "</table></body></html>"
      );
    }
    buildNewsExcelXml(list, cfg) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const row = (cells, hdr) =>
        "<Row>" +
        cells
          .map(
            (c) =>
              "<Cell" +
              (hdr ? ' ss:StyleID="h"' : "") +
              '><Data ss:Type="' +
              (typeof c === "number" ? "Number" : "String") +
              '">' +
              esc(c) +
              "</Data></Cell>",
          )
          .join("") +
        "</Row>";
      const pub = list.filter(
        (n) => n.status === "published" && n.sendMode !== "scheduled",
      ).length;
      const sched = list.filter(
        (n) => n.status === "published" && n.sendMode === "scheduled",
      ).length;
      const draft = list.filter((n) => n.status === "draft").length;
      const s1 = [
        row(
          ["หัวข้อสรุปแจ้งเตือนและข่าวสาร", "จำนวน (รายการ)", "หน่วยงาน"],
          true,
        ),
        row(["ทั้งหมด", list.length, cfg.company]),
        row(["เผยแพร่แล้ว", pub, "แสดงในแอปและกระดิ่งแจ้งเตือน"]),
        row(["ตั้งเวลาล่วงหน้า", sched, "รอเผยแพร่ตามกำหนดเวลา"]),
        row(["แบบร่าง", draft, "ยังไม่เผยแพร่"]),
      ];
      const s2 = [
        row(
          [
            "รหัส",
            "หมวดหมู่",
            "พาดหัว",
            "คำอธิบาย",
            "สถานะ",
            "รูปแบบการส่ง",
            "วันที่ / เวลาเผยแพร่",
          ],
          true,
        ),
      ].concat(
        list.map((n) =>
          row([
            n.id,
            n.tag || "ข่าวสาร",
            n.title,
            n.body,
            n.status === "draft"
              ? "แบบร่าง"
              : n.sendMode === "scheduled"
                ? "ตั้งเวลาล่วงหน้า"
                : "เผยแพร่แล้ว",
            n.sendMode === "scheduled" ? "ตั้งเวลาล่วงหน้า" : "ส่งทันที",
            n.date || "",
          ]),
        ),
      );
      return (
        '<?xml version="1.0" encoding="UTF-8"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="h"><Font ss:Bold="1"/></Style></Styles><Worksheet ss:Name="Summary"><Table>' +
        s1.join("") +
        '</Table></Worksheet><Worksheet ss:Name="Notifications"><Table>' +
        s2.join("") +
        "</Table></Worksheet></Workbook>"
      );
    }
    buildNewsPdfHtml(list, cfg) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const pub = list.filter(
        (n) => n.status === "published" && n.sendMode !== "scheduled",
      ).length;
      const sched = list.filter(
        (n) => n.status === "published" && n.sendMode === "scheduled",
      ).length;
      const draft = list.filter((n) => n.status === "draft").length;
      const rows = list
        .map((n) => {
          const stat =
            n.status === "draft"
              ? "แบบร่าง"
              : n.sendMode === "scheduled"
                ? "ตั้งเวลาล่วงหน้า"
                : "เผยแพร่แล้ว";
          return (
            "<tr><td>" +
            esc(n.tag || "ข่าวสาร") +
            "</td><td><strong>" +
            esc(n.title) +
            "</strong><br><small>" +
            esc(n.body) +
            "</small></td><td>" +
            esc(stat) +
            "</td><td>" +
            esc(n.date || "") +
            "</td></tr>"
          );
        })
        .join("");
      return (
        '<!doctype html><html lang="th"><head><meta charset="utf-8"><title>Charge X Notifications Report</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:Sarabun,"Segoe UI",sans-serif;color:#1F1F1F;margin:0;padding:14px}h1{margin:0 0 4px;font-size:19px;color:#FC3901}p{margin:0 0 10px;font-size:12px;color:#5C5C5C}table{width:100%;border-collapse:collapse;font-size:11.5px}th,td{border:1px solid #E0E0E0;padding:7px 8px;text-align:left;vertical-align:top}th{background:#F6F6F6}</style></head><body><h1>Charge X — รายงานการแจ้งเตือนและข่าวสาร (Notifications &amp; News)</h1><p>' +
        esc(cfg.company) +
        " | ทั้งหมด " +
        list.length +
        " รายการ | เผยแพร่แล้ว " +
        pub +
        " | ตั้งเวลาล่วงหน้า " +
        sched +
        " | แบบร่าง " +
        draft +
        "</p><table><tr><th>หมวดหมู่</th><th>พาดหัวและคำอธิบาย</th><th>สถานะ</th><th>วันที่ / เวลาเผยแพร่</th></tr>" +
        rows +
        "</table></body></html>"
      );
    }
    seedMembers() {
      let liveBal = 500,
        prof = null,
        carObj = null;
      try {
        const sb = localStorage.getItem("cx-wallet-bal");
        if (sb !== null && !isNaN(Number(sb))) liveBal = Number(sb);
        prof = JSON.parse(localStorage.getItem("cx-profile") || "null");
        carObj = JSON.parse(localStorage.getItem("cx-car") || "null");
      } catch (e) {}
      const firstName =
        prof && (prof.first || prof.last)
          ? ((prof.first || "") + " " + (prof.last || "")).trim()
          : "Sawanya Srisawat";
      const firstEmail =
        prof && prof.email ? prof.email : "sawanya.s@example.com";
      const firstPhone = prof && prof.phone ? prof.phone : "0646350846";
      const fmtPhone = (s) => {
        const g = String(s || "").replace(/\D/g, "");
        return g.length === 10
          ? g.slice(0, 3) + "-" + g.slice(3, 6) + "-" + g.slice(6)
          : s;
      };
      const firstCar =
        carObj && carObj.name ? carObj.name : (prof && prof.car) || "Chery Q";
      return [
        {
          id: "mb1",
          name: firstName,
          email: firstEmail,
          phone: fmtPhone(firstPhone),
          car: firstCar,
          joinedIso: "2026-08-12",
          joinedLabel: "12 ส.ค. 2569",
          sessions: 28,
          kwh: 1142.8,
          wallet: liveBal,
          uncollected: 0,
          userRole: "สมาชิก VIP",
          walletStatus: "active",
          taxId: "1100201458901",
        },
        {
          id: "mb2",
          name: "อรรถพล กิตติชัย",
          email: "atthaphon.k@mail.com",
          phone: "081-442-1904",
          car: "BYD Atto 3",
          joinedIso: "2026-07-04",
          joinedLabel: "4 ก.ค. 2569",
          sessions: 34,
          kwh: 1380.4,
          wallet: 1850.0,
          uncollected: 0,
          userRole: "องค์กร / Fleet",
          walletStatus: "active",
          taxId: "0105561088432",
        },
        {
          id: "mb3",
          name: "ปิยะนุช วัฒนากูล",
          email: "piyanuch.w@mail.com",
          phone: "089-231-5572",
          car: "Tesla Model 3",
          joinedIso: "2026-08-21",
          joinedLabel: "21 ส.ค. 2569",
          sessions: 22,
          kwh: 964.2,
          wallet: 42.0,
          uncollected: 235.68,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "1103702944112",
        },
        {
          id: "mb4",
          name: "ธนากร สุขเกษม",
          email: "thanakorn.s@mail.com",
          phone: "092-884-1102",
          car: "MG4 Electric",
          joinedIso: "2026-09-02",
          joinedLabel: "2 ก.ย. 2569",
          sessions: 19,
          kwh: 742.5,
          wallet: 1240.0,
          uncollected: 0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "1101400823901",
        },
        {
          id: "mb5",
          name: "ชนิกานต์ วงศ์สุวรรณ",
          email: "chanikarn.v@mail.com",
          phone: "086-510-7741",
          car: "ORA Good Cat",
          joinedIso: "2026-09-18",
          joinedLabel: "18 ก.ย. 2569",
          sessions: 16,
          kwh: 590.0,
          wallet: 980.0,
          uncollected: 0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "",
        },
        {
          id: "mb6",
          name: "ภาณุวัฒน์ เจริญพร",
          email: "phanuwat.c@mail.com",
          phone: "083-907-3328",
          car: "Deepal S07",
          joinedIso: "2026-06-15",
          joinedLabel: "15 มิ.ย. 2569",
          sessions: 41,
          kwh: 1812.6,
          wallet: 15.0,
          uncollected: 410.0,
          userRole: "สมาชิก VIP",
          walletStatus: "suspended",
          taxId: "1309901122345",
        },
        {
          id: "mb7",
          name: "ศิริลักษณ์ แสงทอง",
          email: "sirilak.st@mail.com",
          phone: "095-620-8819",
          car: "AION Y Plus",
          joinedIso: "2026-10-05",
          joinedLabel: "5 ต.ค. 2569",
          sessions: 14,
          kwh: 528.4,
          wallet: 1420.0,
          uncollected: 0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "",
        },
        {
          id: "mb8",
          name: "กิตติพงศ์ นาคสวัสดิ์",
          email: "kittiphong.n@mail.com",
          phone: "084-319-6045",
          car: "Volvo EX30",
          joinedIso: "2026-10-12",
          joinedLabel: "12 ต.ค. 2569",
          sessions: 25,
          kwh: 1096.0,
          wallet: 2150.0,
          uncollected: 0,
          userRole: "องค์กร / Fleet",
          walletStatus: "active",
          taxId: "0105562099118",
        },
        {
          id: "mb9",
          name: "พิมพ์ชนก อินทร์แก้ว",
          email: "pimchanok.i@mail.com",
          phone: "091-775-2408",
          car: "Neta X",
          joinedIso: "2026-10-20",
          joinedLabel: "20 ต.ค. 2569",
          sessions: 11,
          kwh: 388.2,
          wallet: 690.0,
          uncollected: 0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "",
        },
        {
          id: "mb10",
          name: "ธีรภัทร พงษ์พิพัฒน์",
          email: "theeraphat.p@mail.com",
          phone: "087-612-9034",
          car: "BMW iX3",
          joinedIso: "2026-07-28",
          joinedLabel: "28 ก.ค. 2569",
          sessions: 30,
          kwh: 1495.5,
          wallet: 25.0,
          uncollected: 185.5,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "",
        },
        {
          id: "mb11",
          name: "มัณฑนา มณีรัตน์",
          email: "manthana.m@mail.com",
          phone: "082-194-5580",
          car: "BYD Dolphin",
          joinedIso: "2026-10-28",
          joinedLabel: "28 ต.ค. 2569",
          sessions: 12,
          kwh: 412.0,
          wallet: 1190.0,
          uncollected: 0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "",
        },
        {
          id: "mb12",
          name: "พงศกร รุ่งเรือง",
          email: "pongsakorn.r@mail.com",
          phone: "090-488-7312",
          car: "Tesla Model Y",
          joinedIso: "2026-11-01",
          joinedLabel: "1 พ.ย. 2569",
          sessions: 15,
          kwh: 688.5,
          wallet: 1640.0,
          uncollected: 0,
          userRole: "สมาชิก VIP",
          walletStatus: "active",
          taxId: "1100802399123",
        },
        {
          id: "mb13",
          name: "สุธิดา แก้วมณี",
          email: "suthida.k@mail.com",
          phone: "085-330-4621",
          car: "MG ZS EV",
          joinedIso: "2026-11-08",
          joinedLabel: "8 พ.ย. 2569",
          sessions: 8,
          kwh: 276.4,
          wallet: 780.0,
          uncollected: 0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "",
        },
        {
          id: "mb14",
          name: "เอกชัย บุญมี",
          email: "ekkachai.b@mail.com",
          phone: "094-215-6903",
          car: "BYD Seal",
          joinedIso: "2026-11-12",
          joinedLabel: "12 พ.ย. 2569",
          sessions: 7,
          kwh: 314.0,
          wallet: 18.0,
          uncollected: 320.0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
          taxId: "",
        },
        {
          id: "mb15",
          name: "นภาพร ชัยชนะ",
          email: "napaporn.c@mail.com",
          phone: "088-741-9256",
          car: "ORA 07",
          joinedIso: "2026-11-15",
          joinedLabel: "15 พ.ย. 2569",
          sessions: 5,
          kwh: 204.5,
          wallet: 2260.0,
          uncollected: 0,
          userRole: "องค์กร / Fleet",
          walletStatus: "active",
          taxId: "0105564007812",
        },
      ];
    }
    seedPayCfg() {
      return {
        company: "บริษัท ชาร์จ เอ็กซ์ (ประเทศไทย) จำกัด",
        taxId: "0105566012345",
        addr: "88 อาคาร เอส ทาวเวอร์ ถนนบางนา-ตราด แขวงบางนา เขตบางนา กทม. 10260",
        bankName: "ธนาคารกสิกรไทย (KBank)",
        bankAcc: "014-8-88912-9",
        bankHolder: "บริษัท ชาร์จ เอ็กซ์ (ประเทศไทย) จำกัด",
        gateway: "Omise (Opn Payments) & 2C2P",
        merchantId: "MCH-CHARGEX-9001",
        cycle: "ตัดยอดอัตโนมัติรายวัน 00:00 น. (T+1)",
      };
    }
    seedPayments() {
      return [
        {
          id: "PAY-20261117-01",
          dateIso: "2026-11-17",
          memberId: "mb1",
          memberName: "Sawanya Srisawat",
          memberMeta: "Chery Q · sawanya.s@example.com",
          type: "เติมเงิน Wallet (ไม่เข้า)",
          channel: "KBank K-Plus · Slip",
          amount: 500.0,
          status: "pending",
          note: "ผู้ใช้เติมเงิน ฿500 ผ่าน K-Plus แล้วยอดไม่เข้ากระเป๋า (รอแนบ/ตรวจสลิป)",
          slipImg: "",
          slipFileName: "",
          slipMime: "",
          taxName: "Sawanya Srisawat",
          taxId: "1100201458901",
        },
        {
          id: "PAY-20261117-02",
          dateIso: "2026-11-17",
          memberId: "mb2",
          memberName: "อรรถพล กิตติชัย",
          memberMeta: "BYD Atto 3 · atthaphon.k@mail.com",
          type: "ค่าชาร์จ EV",
          channel: "PromptPay QR · Omise",
          amount: 364.5,
          status: "paid",
          note: "ชาร์จเร็ว CCS2 48.6 kWh · ม.รามคำแหง วิทยาเขต บางนา",
          slipImg: "",
          slipFileName: "",
          slipMime: "",
          taxName: "บริษัท คิทติชัย โลจิสติกส์ จำกัด",
          taxId: "0105561088432",
        },
        {
          id: "PAY-20261116-03",
          dateIso: "2026-11-16",
          memberId: "mb3",
          memberName: "ปิยะนุช วัฒนากูล",
          memberMeta: "Tesla Model 3 · piyanuch.w@mail.com",
          type: "ค่าชาร์จ EV",
          channel: "Visa •••• 0000 · 2C2P",
          amount: 235.68,
          status: "failed",
          note: "ตัดบัตรเครดิตอัตโนมัติไม่ผ่าน (วงเงินไม่พอ) มียอดค้างชำระ",
          slipImg: "",
          slipFileName: "",
          slipMime: "",
          taxName: "ปิยะนุช วัฒนากูล",
          taxId: "1103702944112",
        },
        {
          id: "PAY-20261115-04",
          dateIso: "2026-11-15",
          memberId: "mb8",
          memberName: "กิตติพงศ์ นาคสวัสดิ์",
          memberMeta: "Volvo EX30 · kittiphong.n@mail.com",
          type: "แพ็กเกจ Membership",
          channel: "Visa •••• 4412 · Omise",
          amount: 1290.0,
          status: "paid",
          note: "สมัคร/ต่ออายุแพ็กเกจ Charge X Membership รายเดือน",
          slipImg: "",
          slipFileName: "",
          slipMime: "",
          taxName: "บจก. นาคสวัสดิ์ ฟลีท กรุ๊ป",
          taxId: "0105562099118",
        },
        {
          id: "PAY-20261112-05",
          dateIso: "2026-11-12",
          memberId: "mb4",
          memberName: "ธนากร สุขเกษม",
          memberMeta: "MG4 Electric · thanakorn.s@mail.com",
          type: "ค่าชาร์จ EV",
          channel: "Charge X Wallet",
          amount: 210.0,
          status: "refunded",
          note: "ขอคืนเงินซ้ำซ้อน · ดำเนินการคืนเข้า Wallet เรียบร้อยแล้ว",
          slipImg: "",
          slipFileName: "",
          slipMime: "",
          taxName: "ธนากร สุขเกษม",
          taxId: "1101400823901",
        },
      ];
    }
    seedGatewayBatches() {
      return [
        {
          batchId: "GW-20261116-A",
          gateway: "Omise (PromptPay & Card)",
          dateText: "16 พ.ย. 2569",
          txCount: 142,
          gross: 58420.0,
          fee: 876.3,
          net: 57543.7,
          verifyStatus: "matched",
          bankRef: "โอนแล้ว · อ้างอิง KB-991042",
        },
        {
          batchId: "GW-20261117-B",
          gateway: "2C2P (Visa / Mastercard)",
          dateText: "17 พ.ย. 2569",
          txCount: 86,
          gross: 34280.0,
          fee: 685.6,
          net: 33594.4,
          verifyStatus: "pending",
          bankRef: "รอเงินโอนเข้าบัญชีบริษัท",
        },
        {
          batchId: "GW-20261117-C",
          gateway: "KBank Corporate QR API",
          dateText: "17 พ.ย. 2569",
          txCount: 64,
          gross: 19850.0,
          fee: 198.5,
          net: 19651.5,
          verifyStatus: "pending",
          bankRef: "รอเงินโอนเข้าบัญชีบริษัท",
        },
      ];
    }
    sampleSlipDataUri(kind) {
      const mime = kind === "jpg" ? "image/jpeg" : "image/png";
      const lbl =
        kind === "jpg" ? "JPEG BANK SLIP · ฿500.00" : "PNG BANK SLIP · ฿500.00";
      const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260"><rect width="420" height="260" rx="18" fill="#F6FBF8"/><rect x="20" y="20" width="380" height="220" rx="14" fill="#FFFFFF" stroke="#146C3E" stroke-width="2"/><circle cx="62" cy="64" r="20" fill="#146C3E"/><path d="M53 64l6 6 12-13" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/><text x="96" y="60" font-family="sans-serif" font-size="16" font-weight="700" fill="#146C3E">TRANSFER SLIP VERIFIED</text><text x="96" y="80" font-family="sans-serif" font-size="12" fill="#5C5C5C">' +
        lbl +
        '</text><line x1="36" y1="104" x2="384" y2="104" stroke="#E6E6E6"/><text x="36" y="136" font-family="sans-serif" font-size="13" font-weight="700" fill="#1F1F1F">From: KBank K-Plus · ***4812</text><text x="36" y="164" font-family="sans-serif" font-size="13" font-weight="700" fill="#1F1F1F">To: Charge X (Thailand) Co., Ltd.</text><text x="36" y="196" font-family="sans-serif" font-size="22" font-weight="800" fill="#FC3901">THB 500.00</text><text x="36" y="222" font-family="sans-serif" font-size="11" fill="#6B6B6B">Ref: KB-20261117-500841</text></svg>';
      return {
        mime,
        url: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg),
      };
    }
    buildPayDocHtml(pay, docType, cfg) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const isTax = docType === "tax";
      const title = isTax
        ? "ใบเสร็จรับเงิน / ใบกำกับภาษี (Receipt / Tax Invoice)"
        : "ใบแจ้งหนี้ (Invoice)";
      const docNo =
        (isTax ? "TAX-" : "INV-") + String(pay.id || "01").replace("PAY-", "");
      const amt = Number(pay.amount) || 0;
      const sub = +(amt / 1.07).toFixed(2);
      const vat = +(amt - sub).toFixed(2);
      return (
        '<!doctype html><html lang="th"><head><meta charset="utf-8"><title>' +
        esc(docNo) +
        '</title><style>@page{size:A4;margin:14mm}body{font-family:Sarabun,"Segoe UI",sans-serif;color:#1F1F1F;margin:0;padding:24px}h1{margin:0;font-size:20px;color:#FC3901}.box{border:1px solid #E0E0E0;border-radius:12px;padding:14px;margin:12px 0}table{width:100%;border-collapse:collapse;margin-top:10px}th,td{border:1px solid #E0E0E0;padding:8px 10px;text-align:left;font-size:13px}th{background:#F6F6F6}</style></head><body><h1>' +
        esc(title) +
        "</h1><p>" +
        esc(cfg.company) +
        " · เลขผู้เสียภาษี " +
        esc(cfg.taxId) +
        "<br>" +
        esc(cfg.addr) +
        '</p><div class="box"><strong>เลขที่เอกสาร:</strong> ' +
        esc(docNo) +
        " | <strong>วันที่:</strong> " +
        esc(pay.dateIso) +
        "<br><strong>ลูกค้า:</strong> " +
        esc(pay.taxName || pay.memberName) +
        (pay.taxId ? " (Tax ID: " + esc(pay.taxId) + ")" : "") +
        "</div><table><tr><th>รายการ</th><th>ช่องทาง</th><th>มูลค่าก่อน VAT</th><th>VAT 7%</th><th>ยอดรวม</th></tr><tr><td>" +
        esc(pay.type + " — " + pay.note) +
        "</td><td>" +
        esc(pay.channel) +
        "</td><td>฿" +
        this.fmtNum(sub, 2) +
        "</td><td>฿" +
        this.fmtNum(vat, 2) +
        "</td><td><strong>฿" +
        this.fmtNum(amt, 2) +
        "</strong></td></tr></table></body></html>"
      );
    }
    seedAccessLogs() {
      return [
        {
          id: "al1",
          ts: "2026-11-17 10:40:12",
          dateIso: "2026-11-17",
          actor: "ณัฐพงษ์ วงศ์ชัย",
          email: "nattapong@chargex.co.th",
          role: "operator",
          action: "สร้างคูปองส่วนลด EV50 & DC25",
          channel: "Web Desktop · IP 192.168.10.42",
          status: "ok",
        },
        {
          id: "al2",
          ts: "2026-11-17 09:15:04",
          dateIso: "2026-11-17",
          actor: "วรพล ศิริวัฒน์",
          email: "superadmin@chargex.co.th",
          role: "super_admin",
          action: "เข้าสู่ระบบ Back Office",
          channel: "Web Desktop · IP 192.168.10.21",
          status: "ok",
        },
        {
          id: "al3",
          ts: "2026-11-16 17:20:48",
          dateIso: "2026-11-16",
          actor: "กัญญา รัตนสุข",
          email: "kanya@chargex.co.th",
          role: "operator",
          action: "อัปเดตสถานะตู้ชาร์จ Monitor #3092",
          channel: "Web Desktop · IP 192.168.10.55",
          status: "ok",
        },
        {
          id: "al4",
          ts: "2026-11-16 14:05:31",
          dateIso: "2026-11-16",
          actor: "ณัฐพงษ์ วงศ์ชัย",
          email: "nattapong@chargex.co.th",
          role: "operator",
          action: "เผยแพร่ข่าวสารโปรโมชัน Off-Peak",
          channel: "Web Desktop · IP 192.168.10.42",
          status: "ok",
        },
        {
          id: "al5",
          ts: "2026-11-15 11:18:09",
          dateIso: "2026-11-15",
          actor: "ผู้ใช้ภายนอกระบบ",
          email: "test.user@gmail.com",
          role: "operator",
          action: "เข้าสู่ระบบไม่สำเร็จ (ไม่ใช่ @chargex.co.th)",
          channel: "Web Desktop · IP 203.154.88.14",
          status: "denied",
        },
        {
          id: "al6",
          ts: "2026-11-14 16:45:22",
          dateIso: "2026-11-14",
          actor: "วรพล ศิริวัฒน์",
          email: "superadmin@chargex.co.th",
          role: "super_admin",
          action: "ส่งออกรายงาน Excel แผงบริหาร",
          channel: "Web Desktop · IP 192.168.10.21",
          status: "ok",
        },
        {
          id: "al7",
          ts: "2026-11-12 09:30:10",
          dateIso: "2026-11-12",
          actor: "วรพล ศิริวัฒน์",
          email: "superadmin@chargex.co.th",
          role: "super_admin",
          action: "เพิ่มบัญชี Operator (kanya@chargex.co.th)",
          channel: "Web Desktop · IP 192.168.10.21",
          status: "ok",
        },
      ];
    }
    recordAccess(actor, email, role, action, status) {
      const iso = this.todayIso();
      const hms = this.nowHms();
      const cur =
        this.state && Array.isArray(this.state.accessLogs)
          ? this.state.accessLogs
          : this.seedAccessLogs();
      const entry = {
        id: "al_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
        ts: iso + " " + hms,
        dateIso: iso,
        actor: actor || email || "ผู้ใช้ภายนอกระบบ",
        email: email || "-",
        role: role || "operator",
        action,
        channel: "Web Desktop · Real-Time Session",
        status: status || "ok",
      };
      const next = [entry].concat(cur).slice(0, 60);
      this.saveStore("cx-bo-access-logs", next);
      return next;
    }
    buildChargerUnits(stations, monitors, rpDays, rtTick) {
      const monMap = {};
      (monitors || []).forEach((m) => {
        monMap[m.id] = m;
        monMap[m.station] = m;
      });
      const baseSess = rpDays.reduce((a, b) => a + b.sessions, 0);
      const baseKwh = +rpDays.reduce((a, b) => a + b.kwh, 0).toFixed(1);
      const SLOTS = [
        {
          id: "s00",
          label: "00:00–06:00 (Off-Peak)",
          tag: "Off-Peak ลด 10%",
          w: 0.12,
        },
        {
          id: "s06",
          label: "06:00–12:00 (ช่วงเช้า)",
          tag: "การใช้งานปกติ",
          w: 0.23,
        },
        {
          id: "s12",
          label: "12:00–18:00 (ช่วงบ่าย Peak)",
          tag: "Peak ช่วงบ่าย",
          w: 0.31,
        },
        {
          id: "s18",
          label: "18:00–24:00 (ช่วงค่ำ Peak)",
          tag: "Peak สูงสุด",
          w: 0.34,
        },
      ];
      const tickDelta = Math.max(0, (Number(rtTick) || 1) - 1);
      const units = [];
      stations.forEach((s, idx) => {
        const cnt = Math.max(1, Number(s.chargerCount) || 1);
        const mon = (s.monId && monMap[s.monId]) || monMap[s.name] || null;
        const isAcStation = /AC/i.test(String(s.power || ""));
        const ratedPower = String(s.power || "150 kW DC")
          .split("·")[0]
          .trim();
        const stShare = Number(s.share) || 0.1;
        const stFault = Math.max(0, Number(s.faultCount) || 0);
        for (let u = 0; u < cnt; u++) {
          let unitCode = "#" + (4141 + idx * 100 + u);
          if (u === 0 && mon && mon.bay) {
            const bm = /#\d+/.exec(String(mon.bay));
            unitCode = bm ? bm[0] : String(mon.bay);
          }
          let connType = "CCS2 DC";
          if (isAcStation) connType = "AC Type 2";
          else if (u === 1 && idx % 3 === 1) connType = "CHAdeMO";
          else if (u === 1 && idx % 5 === 0) connType = "AC Type 2";
          const status =
            u === 0 && mon
              ? mon.status
              : s.status === "maint"
                ? "maint"
                : s.status === "charging" && u === 0
                  ? "charging"
                  : "online";
          const weight =
            (stShare / cnt) *
            (connType === "CCS2 DC"
              ? 1.08
              : connType === "CHAdeMO"
                ? 0.88
                : 0.72);
          const liveSess =
            status === "charging" ? Math.floor((tickDelta + u) / 2) : 0;
          const liveKwh =
            status === "charging" ? +(tickDelta * 1.8).toFixed(1) : 0;
          const uSess = Math.max(1, Math.round(baseSess * weight) + liveSess);
          const uKwh = +(Math.max(12, baseKwh * weight) + liveKwh).toFixed(1);
          const uRev = +(uKwh * 7.5).toFixed(2);
          const kwNum = parseInt(ratedPower, 10) || 120;
          const soc = 68 + ((tickDelta * 3 + idx * 5 + u) % 27);
          const liveKw = +Math.min(
            kwNum,
            Math.max(18, kwNum * 0.74 + ((tickDelta + idx) % 9) * 1.4),
          ).toFixed(1);
          const liveLoadText =
            status === "charging"
              ? liveKw + " kW · " + soc + "%"
              : status === "maint"
                ? "ปิดบำรุงรักษา · 0.0 kW"
                : "สแตนด์บาย · 0.0 kW";
          const uFaults = u === 0 ? stFault : Math.floor(stFault / 2);
          const slotParts = {};
          SLOTS.forEach((sl, si) => {
            const sw =
              sl.w *
              (connType === "AC Type 2" && sl.id === "s00"
                ? 1.25
                : connType === "CCS2 DC" && (sl.id === "s12" || sl.id === "s18")
                  ? 1.06
                  : 1);
            const ss = Math.max(si === 3 ? 1 : 0, Math.round(uSess * sw));
            const sk = +(uKwh * sw).toFixed(1);
            slotParts[sl.id] = {
              sessions: ss,
              kwh: sk,
              rev: +(sk * 7.5).toFixed(2),
            };
          });
          units.push({
            id: s.id + "_u" + u,
            stationId: s.id,
            station: s.name,
            owner: s.owner,
            address: s.address,
            unitCode,
            connType,
            ratedPower,
            status,
            liveLoadText,
            sessions: uSess,
            kwh: uKwh,
            rev: uRev,
            faults: uFaults,
            slotParts,
          });
        }
      });
      return { units, SLOTS };
    }
    computeReport(st, dash, accent) {
      const f0 = this.parseIso(st.rpFrom),
        t0 = this.parseIso(st.rpTo);
      const fromMs = Math.min(f0, t0),
        toMs = Math.max(f0, t0);
      const nDays = Math.min(
        365,
        Math.max(1, Math.round((toMs - fromMs) / 86400000) + 1),
      );
      const rpDays = [];
      for (let i = 0; i < nDays; i++)
        rpDays.push(this.dayStat(fromMs + i * 86400000));
      const fromIso = this.toIso(fromMs),
        toIso = this.toIso(toMs);
      const q = String(st.rpSearch || "")
        .trim()
        .toLowerCase();
      const toSel = (v) => {
        if (Array.isArray(v)) return v.filter((x) => x && x !== "all");
        const s = String(v || "all").trim();
        if (!s || s === "all") return [];
        return s
          .split(",")
          .map((x) => x.trim())
          .filter((x) => x && x !== "all");
      };
      const connSel = toSel(st.rpConnFilter);
      const slotSel = toSel(st.rpSlotFilter);
      const stSel = toSel(st.rpStationFilter);
      const roleSel = toSel(st.rpRoleFilter);
      const { units, SLOTS } = this.buildChargerUnits(
        dash.stations,
        st.monitors,
        rpDays,
        st.rpRtTick,
      );
      const filteredChargers = units
        .filter((u) => {
          const okConn = !connSel.length || connSel.indexOf(u.connType) >= 0;
          const okSt = !stSel.length || stSel.indexOf(u.stationId) >= 0;
          const okQ =
            !q ||
            [
              u.unitCode,
              u.station,
              u.owner,
              u.connType,
              u.ratedPower,
              u.status,
            ].some((v) =>
              String(v || "")
                .toLowerCase()
                .includes(q),
            );
          return okConn && okSt && okQ;
        })
        .map((u) => {
          let picked = { sessions: u.sessions, kwh: u.kwh, rev: u.rev };
          if (slotSel.length) {
            picked = slotSel.reduce(
              (acc, sid) => {
                const part = u.slotParts[sid];
                if (!part) return acc;
                return {
                  sessions: acc.sessions + part.sessions,
                  kwh: +(acc.kwh + part.kwh).toFixed(1),
                  rev: +(acc.rev + part.rev).toFixed(2),
                };
              },
              { sessions: 0, kwh: 0, rev: 0 },
            );
          }
          const isChg = u.status === "charging",
            isMaint = u.status === "maint";
          const statText = isChg
            ? "กำลังชาร์จ"
            : isMaint
              ? "บำรุงรักษา"
              : "ออนไลน์";
          const statStyle =
            "padding: 3px 9px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
            (isChg
              ? "background: #FFF1EB; color: #C42D00"
              : isMaint
                ? "background: #FFF4E0; color: #B86A00"
                : "background: #E7F6EE; color: #146C3E");
          return Object.assign({}, u, {
            sessions: picked.sessions,
            kwh: picked.kwh,
            rev: picked.rev,
            sessionsText: this.fmtNum(picked.sessions) + " ครั้ง",
            kwhText: this.fmtNum(picked.kwh, 1) + " kWh",
            revText: "฿" + this.fmtNum(picked.rev, 2),
            faultText: "ขัดข้อง " + u.faults + " ครั้ง",
            faultStyle:
              "font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; " +
              (u.faults >= 3
                ? "color: #B42318"
                : u.faults > 0
                  ? "color: #B86A00"
                  : "color: #6B6B6B"),
            statText,
            statStyle,
          });
        });
      const totUsageSess = filteredChargers.reduce((a, b) => a + b.sessions, 0);
      const totUsageKwh = +filteredChargers
        .reduce((a, b) => a + b.kwh, 0)
        .toFixed(1);
      const totUsageRev = +filteredChargers
        .reduce((a, b) => a + b.rev, 0)
        .toFixed(2);
      const totUsageCarbon = +(totUsageKwh * 0.45).toFixed(1);
      const connMap = {};
      ["CCS2 DC", "AC Type 2", "CHAdeMO"].forEach((t) => {
        connMap[t] = { type: t, units: 0, sessions: 0, kwh: 0, rev: 0 };
      });
      filteredChargers.forEach((u) => {
        const b =
          connMap[u.connType] ||
          (connMap[u.connType] = {
            type: u.connType,
            units: 0,
            sessions: 0,
            kwh: 0,
            rev: 0,
          });
        b.units += 1;
        b.sessions += u.sessions;
        b.kwh = +(b.kwh + u.kwh).toFixed(1);
        b.rev = +(b.rev + u.rev).toFixed(2);
      });
      const connRaw = Object.keys(connMap)
        .map((k) => connMap[k])
        .filter(
          (c) =>
            c.units > 0 || (connSel.length && connSel.indexOf(c.type) >= 0),
        );
      const rpConnRows = connRaw.map((c) => {
        const pct =
          totUsageKwh > 0 ? +((c.kwh / totUsageKwh) * 100).toFixed(1) : 0;
        return {
          type: c.type,
          units: c.units,
          unitsText: c.units + " ตู้",
          sessions: c.sessions,
          kwh: c.kwh,
          rev: c.rev,
          sessionsText: this.fmtNum(c.sessions) + " ครั้ง",
          kwhText: this.fmtNum(c.kwh, 1) + " kWh",
          revText: "฿" + this.fmtNum(c.rev, 2),
          sharePct: pct,
          shareText: "สัดส่วน " + pct + "%",
          barStyle:
            "height: 100%; border-radius: 999px; background: " +
            (c.type === "CCS2 DC"
              ? accent
              : c.type === "AC Type 2"
                ? "#146C3E"
                : "#B86A00") +
            "; width: " +
            Math.max(4, Math.min(100, Math.round(pct))) +
            "%",
        };
      });
      const matchingUnitsForSlots = units.filter(
        (u) =>
          (!connSel.length || connSel.indexOf(u.connType) >= 0) &&
          (!stSel.length || stSel.indexOf(u.stationId) >= 0) &&
          (!q ||
            [u.unitCode, u.station, u.owner, u.connType].some((v) =>
              String(v || "")
                .toLowerCase()
                .includes(q),
            )),
      );
      const slotTotals = SLOTS.map((sl) => {
        const sess = matchingUnitsForSlots.reduce(
          (a, u) => a + (u.slotParts[sl.id] ? u.slotParts[sl.id].sessions : 0),
          0,
        );
        const kwh = +matchingUnitsForSlots
          .reduce(
            (a, u) => a + (u.slotParts[sl.id] ? u.slotParts[sl.id].kwh : 0),
            0,
          )
          .toFixed(1);
        const rev = +(kwh * 7.5).toFixed(2);
        return Object.assign({}, sl, { sessions: sess, kwh, rev });
      }).filter((sl) => !slotSel.length || slotSel.indexOf(sl.id) >= 0);
      const slotKwhSum = slotTotals.reduce((a, b) => a + b.kwh, 0);
      const rpSlotRows = slotTotals.map((sl) => {
        const pct =
          slotKwhSum > 0 ? +((sl.kwh / slotKwhSum) * 100).toFixed(1) : 0;
        const isPeak = sl.id === "s12" || sl.id === "s18";
        return {
          id: sl.id,
          slot: sl.label,
          tag: sl.tag,
          tagStyle:
            "padding: 2px 7px; border-radius: 999px; font-size: 11.5px; font-weight: 700; " +
            (sl.id === "s00"
              ? "background: #E7F6EE; color: #146C3E"
              : isPeak
                ? "background: #FFF1EB; color: #C42D00"
                : "background: #F4F4F4; color: #3A3A3A"),
          sessions: sl.sessions,
          kwh: sl.kwh,
          rev: sl.rev,
          sessionsText: this.fmtNum(sl.sessions) + " ครั้ง",
          kwhText: this.fmtNum(sl.kwh, 1) + " kWh",
          revText: "฿" + this.fmtNum(sl.rev, 2),
          sharePct: pct,
          shareText: "สัดส่วน " + pct + "%",
          barStyle:
            "height: 100%; border-radius: 999px; background: " +
            (isPeak ? accent : "#146C3E") +
            "; width: " +
            Math.max(4, Math.min(100, Math.round(pct))) +
            "%",
        };
      });
      const stUsageMap = {};
      filteredChargers.forEach((u) => {
        const r =
          stUsageMap[u.stationId] ||
          (stUsageMap[u.stationId] = {
            id: u.stationId,
            sessions: 0,
            kwh: 0,
            rev: 0,
          });
        r.sessions += u.sessions;
        r.kwh = +(r.kwh + u.kwh).toFixed(1);
        r.rev = +(r.rev + u.rev).toFixed(2);
      });
      const rpStationRows = dash.stations
        .filter((s) => {
          const okSt = !stSel.length || stSel.indexOf(s.id) >= 0;
          const okConn =
            !connSel.length ||
            filteredChargers.some((u) => u.stationId === s.id);
          const okQ =
            !q ||
            [s.name, s.owner, s.address, s.contactName, s.power].some((v) =>
              String(v || "")
                .toLowerCase()
                .includes(q),
            );
          return okSt && okConn && okQ;
        })
        .map((s) => {
          const us = stUsageMap[s.id] || { sessions: 0, kwh: 0, rev: 0 };
          const chargers = Math.max(1, Number(s.chargerCount) || 1);
          const bays = Math.max(1, Number(s.totalBays) || 2);
          const fc = Math.max(0, Number(s.faultCount) || 0);
          const isChg = s.status === "charging",
            isMaint = s.status === "maint";
          const pct =
            totUsageKwh > 0 ? +((us.kwh / totUsageKwh) * 100).toFixed(1) : 0;
          return {
            id: s.id,
            name: s.name,
            owner: s.owner || "",
            address: s.address || "",
            mapUrl:
              s.mapUrl ||
              "https://www.google.com/maps?q=" +
                (s.lat || "13.6682") +
                "," +
                (s.lng || "100.6845"),
            coordText: (s.lat || "13.6682") + ", " + (s.lng || "100.6845"),
            contactText:
              (s.contactName || "") +
              (s.contactPhone ? " · " + s.contactPhone : ""),
            power: s.power,
            chargers,
            bays,
            chargerText: chargers + " ตู้ชาร์จ · " + bays + " หัวชาร์จ",
            uptimeText:
              "Uptime " +
              Number(s.uptimePct != null ? s.uptimePct : 99.5).toFixed(1) +
              "%",
            faultCount: fc,
            faultText: "ขัดข้อง " + fc + " ครั้ง",
            faultStyle:
              "font-size: 12.5px; font-weight: 700; font-variant-numeric: tabular-nums; " +
              (fc >= 3
                ? "color: #B42318"
                : fc > 0
                  ? "color: #B86A00"
                  : "color: #6B6B6B"),
            sessions: us.sessions,
            kwh: us.kwh,
            rev: us.rev,
            sessionsText: this.fmtNum(us.sessions) + " ครั้ง",
            kwhText: this.fmtNum(us.kwh, 1) + " kWh",
            revText: "฿" + this.fmtNum(us.rev, 2),
            usageText:
              this.fmtNum(us.sessions) +
              " ครั้ง · " +
              this.fmtNum(us.kwh, 1) +
              " kWh",
            sharePct: pct,
            shareText: "สัดส่วน " + pct + "%",
            barStyle:
              "height: 100%; border-radius: 999px; background: " +
              accent +
              "; width: " +
              Math.max(4, Math.min(100, Math.round(pct))) +
              "%",
            statText: isChg ? "กำลังชาร์จ" : isMaint ? "บำรุงรักษา" : "ออนไลน์",
            statStyle:
              "padding: 3px 9px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
              (isChg
                ? "background: #FFF1EB; color: #C42D00"
                : isMaint
                  ? "background: #FFF4E0; color: #B86A00"
                  : "background: #E7F6EE; color: #146C3E"),
          };
        });
      const rpStUsageRows = rpStationRows.slice().sort((a, b) => b.kwh - a.kwh);
      const rpUnitUsageRows = filteredChargers
        .slice()
        .sort((a, b) => b.kwh - a.kwh)
        .slice(0, 8);
      const memberRoleSel = roleSel.filter(
        (r) => ["ผู้ใช้ทั่วไป", "สมาชิก VIP", "องค์กร / Fleet"].indexOf(r) >= 0,
      );
      const rpUserRows = dash.members
        .filter((m) => {
          const okRole =
            !memberRoleSel.length ||
            memberRoleSel.indexOf(m.userRole || "ผู้ใช้ทั่วไป") >= 0;
          const okQ =
            !q ||
            [m.name, m.email, m.phone, m.car, m.userRole].some((v) =>
              String(v || "")
                .toLowerCase()
                .includes(q),
            );
          return okRole && okQ;
        })
        .map((m) => {
          const ur = m.userRole || "ผู้ใช้ทั่วไป";
          const susp = m.walletStatus === "suspended";
          return {
            id: m.id,
            name: m.name,
            joinedLabel: m.joinedLabel,
            email: m.email,
            phone: m.phone,
            car: m.car,
            userRole: ur,
            roleStyle:
              "padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
              (ur === "องค์กร / Fleet"
                ? "background: #FFF1EB; color: #C42D00"
                : ur === "สมาชิก VIP"
                  ? "background: #FFF4E0; color: #B86A00"
                  : "background: #F4F4F4; color: #3A3A3A"),
            walletStatText: susp ? "ระงับชั่วคราว" : "ใช้งานปกติ",
            walletStatStyle:
              "padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
              (susp
                ? "background: #FDECEC; color: #B42318"
                : "background: #E7F6EE; color: #146C3E"),
            sessions: m.sessions,
            kwh: m.kwh,
            sessionsText: this.fmtNum(m.sessions) + " ครั้ง",
            kwhText: this.fmtNum(m.kwh, 1) + " kWh",
            wallet: m.wallet,
            uncollected: m.uncollected,
            walletText: "฿" + this.fmtNum(m.wallet, 2),
            uncollText:
              m.uncollected > 0 ? "฿" + this.fmtNum(m.uncollected, 2) : "฿0.00",
            uncollStyle:
              "font-weight: 700; text-align: right; font-variant-numeric: tabular-nums; " +
              (m.uncollected > 0 ? "color: #B42318" : "color: #6B6B6B"),
          };
        });
      const sysRoleSel = roleSel.filter(
        (r) => r === "super_admin" || r === "operator",
      );
      const rawAccess =
        st.accessLogs && st.accessLogs.length
          ? st.accessLogs
          : this.seedAccessLogs();
      const rpAccessRows = rawAccess
        .filter((a) => {
          const dIso = a.dateIso || String(a.ts || "").slice(0, 10);
          const okDate = !dIso || (dIso >= fromIso && dIso <= toIso);
          const okRole = !sysRoleSel.length || sysRoleSel.indexOf(a.role) >= 0;
          const okQ =
            !q ||
            [a.actor, a.email, a.action, a.channel, a.role].some((v) =>
              String(v || "")
                .toLowerCase()
                .includes(q),
            );
          return okDate && okRole && okQ;
        })
        .map((a) => {
          const sup = a.role === "super_admin";
          const statText =
            a.status === "denied"
              ? "ไม่ผ่านสิทธิ์"
              : a.status === "logout"
                ? "ออกจากระบบ"
                : "สำเร็จ";
          const statStyle =
            "padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
            (a.status === "denied"
              ? "background: #FDECEC; color: #B42318"
              : a.status === "logout"
                ? "background: #F4F4F4; color: #3A3A3A"
                : "background: #E7F6EE; color: #146C3E");
          return {
            id: a.id,
            ts: a.ts,
            actor: a.actor,
            email: a.email,
            roleText: sup ? "Super Admin" : "Operator",
            roleStyle:
              "padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
              (sup
                ? "background: #FFF1EB; color: #C42D00"
                : "background: #F4F4F4; color: #3A3A3A"),
            action: a.action,
            channel: a.channel,
            statText,
            statStyle,
          };
        });
      const avgKwhPerSess =
        totUsageSess > 0 ? (totUsageKwh / totUsageSess).toFixed(1) : "0.0";
      const litersEq = (totUsageKwh * 0.19).toFixed(0);
      const rpKpis = [
        {
          label: "ยอดใช้งานรวมทั้งหมด",
          val: this.fmtNum(totUsageSess) + " ครั้ง",
          fg: "#1F1F1F",
          sub:
            "รวม " +
            rpStationRows.length +
            " สถานี · " +
            filteredChargers.length +
            " ตู้ชาร์จ",
          cardStyle:
            "background: #FFFFFF; border: 1.5px solid " +
            accent +
            "; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(252,57,1,0.08)",
          isSess: true,
          isKwh: false,
          isRev: false,
          isCo2: false,
        },
        {
          label: "พลังงานรวม (kWh)",
          val: this.fmtNum(totUsageKwh, 1) + " kWh",
          fg: "#146C3E",
          sub: "เฉลี่ย " + avgKwhPerSess + " kWh/ครั้ง",
          cardStyle:
            "background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03)",
          isSess: false,
          isKwh: true,
          isRev: false,
          isCo2: false,
        },
        {
          label: "รายได้รวมจากการชาร์จ",
          val: "฿" + this.fmtNum(totUsageRev, 2),
          fg: "#1F1F1F",
          sub: "คำนวณรวม " + filteredChargers.length + " ตู้ชาร์จ",
          cardStyle:
            "background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03)",
          isSess: false,
          isKwh: false,
          isRev: true,
          isCo2: false,
        },
        {
          label: "ลดคาร์บอนสะสม",
          val: this.fmtNum(totUsageCarbon, 1) + " kg CO₂",
          fg: "#1F1F1F",
          sub: "ลดเทียบเท่าน้ำมัน ~" + litersEq + " ลิตร",
          cardStyle:
            "background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03)",
          isSess: false,
          isKwh: false,
          isRev: false,
          isCo2: true,
        },
      ];
      return {
        fromIso,
        toIso,
        nDays,
        rpKpis,
        totUsageSess,
        totUsageKwh,
        totUsageRev,
        totUsageCarbon,
        rpConnRows,
        rpSlotRows,
        rpStUsageRows,
        rpUnitUsageRows,
        rpUserRows,
        rpAccessRows,
        rpStationRows,
        rpAllChargers: filteredChargers,
      };
    }
    buildReportExcelXml(rep, cfg) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const row = (cells, hdr) =>
        "<Row>" +
        cells
          .map(
            (c) =>
              "<Cell" +
              (hdr ? ' ss:StyleID="h"' : "") +
              '><Data ss:Type="' +
              (typeof c === "number" && isFinite(c) ? "Number" : "String") +
              '">' +
              esc(c) +
              "</Data></Cell>",
          )
          .join("") +
        "</Row>";
      const sh = (name, rows) =>
        '<Worksheet ss:Name="' +
        esc(name) +
        '"><Table>' +
        rows.join("") +
        "</Table></Worksheet>";
      const s1 = [
        row(
          [
            "Charge X Back Office — รายงานสรุป (Report)",
            cfg.company,
            rep.fromIso + " - " + rep.toIso,
          ],
          true,
        ),
        row(["ยอดใช้งานรวม (ครั้ง)", rep.totUsageSess]),
        row(["พลังงานรวม (kWh)", rep.totUsageKwh]),
        row(["รายได้รวม (บาท)", rep.totUsageRev]),
        row(["ลดคาร์บอน (kg CO2)", rep.totUsageCarbon]),
        row(["จำนวนสถานี (แห่ง)", rep.rpStationRows.length]),
        row(["จำนวนตู้ชาร์จทั้งหมด (ตู้)", rep.rpAllChargers.length]),
        row(["จำนวนผู้ใช้งาน (คน)", rep.rpUserRows.length]),
        row(["ประวัติเข้าใช้งานระบบ (รายการ)", rep.rpAccessRows.length]),
      ];
      const s2 = [
        row(
          [
            "ประเภทหัวชาร์จ",
            "จำนวนตู้",
            "ครั้งชาร์จ",
            "พลังงาน (kWh)",
            "รายได้ (บาท)",
            "สัดส่วน",
          ],
          true,
        ),
      ]
        .concat(
          rep.rpConnRows.map((c) =>
            row([c.type, c.units, c.sessions, c.kwh, c.rev, c.sharePct + "%"]),
          ),
        )
        .concat([row(["--- แยกตามรอบเวลา ---", "", "", "", "", ""], true)])
        .concat(
          rep.rpSlotRows.map((sl) =>
            row([
              sl.slot,
              sl.tag,
              sl.sessions,
              sl.kwh,
              sl.rev,
              sl.sharePct + "%",
            ]),
          ),
        );
      const s3 = [
        row(
          [
            "ชื่อสถานีชาร์จ",
            "เจ้าของ",
            "ที่อยู่",
            "พิกัด Google Map",
            "ผู้ดูแล",
            "จำนวนตู้",
            "หัวชาร์จ",
            "ครั้งชาร์จ",
            "พลังงาน (kWh)",
            "รายได้",
            "ขัดข้อง",
            "สถานะ",
          ],
          true,
        ),
      ].concat(
        rep.rpStationRows.map((s) =>
          row([
            s.name,
            s.owner,
            s.address,
            s.mapUrl,
            s.contactText,
            s.chargers,
            s.bays,
            s.sessions,
            s.kwh,
            s.rev,
            s.faultCount,
            s.statText,
          ]),
        ),
      );
      const s4 = [
        row(
          [
            "รหัสตู้ชาร์จ",
            "สถานีชาร์จ",
            "หัวชาร์จ",
            "กำลังไฟ",
            "โหลด Real-Time",
            "ครั้งชาร์จ",
            "พลังงาน (kWh)",
            "รายได้",
            "ขัดข้อง",
            "สถานะ",
          ],
          true,
        ),
      ].concat(
        rep.rpAllChargers.map((c) =>
          row([
            c.unitCode,
            c.station,
            c.connType,
            c.ratedPower,
            c.liveLoadText,
            c.sessions,
            c.kwh,
            c.rev,
            c.faults,
            c.statText,
          ]),
        ),
      );
      const s5 = [
        row(
          [
            "ชื่อสมาชิก",
            "อีเมล",
            "เบอร์โทร",
            "รถ EV",
            "User Role",
            "สถานะ Wallet",
            "ครั้งชาร์จ",
            "พลังงาน (kWh)",
            "ยอด Wallet",
            "ยอดตัดไม่ได้",
          ],
          true,
        ),
      ].concat(
        rep.rpUserRows.map((u) =>
          row([
            u.name,
            u.email,
            u.phone,
            u.car,
            u.userRole,
            u.walletStatText,
            u.sessions,
            u.kwh,
            u.wallet,
            u.uncollected,
          ]),
        ),
      );
      const s6 = [
        row(
          [
            "วัน-เวลา",
            "ผู้ใช้งาน",
            "อีเมล",
            "Role",
            "กิจกรรม",
            "ช่องทาง",
            "ผลลัพธ์",
          ],
          true,
        ),
      ].concat(
        rep.rpAccessRows.map((a) =>
          row([
            a.ts,
            a.actor,
            a.email,
            a.roleText,
            a.action,
            a.channel,
            a.statText,
          ]),
        ),
      );
      return (
        '<?xml version="1.0" encoding="UTF-8"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="h"><Font ss:Bold="1"/></Style></Styles>' +
        sh("UsageSummary", s1) +
        sh("ConnectorAndSlot", s2) +
        sh("Stations", s3) +
        sh("AllChargers", s4) +
        sh("Users", s5) +
        sh("AccessLogs", s6) +
        "</Workbook>"
      );
    }
    buildReportPdfHtml(rep, cfg) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const cTr = rep.rpConnRows
        .map(
          (c) =>
            "<tr><td>" +
            esc(c.type) +
            "</td><td>" +
            c.units +
            "</td><td>" +
            c.sessions +
            "</td><td>" +
            this.fmtNum(c.kwh, 1) +
            "</td><td>฿" +
            this.fmtNum(c.rev, 2) +
            "</td><td>" +
            c.sharePct +
            "%</td></tr>",
        )
        .join("");
      const sTr = rep.rpSlotRows
        .map(
          (sl) =>
            "<tr><td>" +
            esc(sl.slot) +
            "</td><td>" +
            esc(sl.tag) +
            "</td><td>" +
            sl.sessions +
            "</td><td>" +
            this.fmtNum(sl.kwh, 1) +
            "</td><td>฿" +
            this.fmtNum(sl.rev, 2) +
            "</td></tr>",
        )
        .join("");
      const stTr = rep.rpStationRows
        .map(
          (s) =>
            "<tr><td>" +
            esc(s.name) +
            "</td><td>" +
            esc(s.owner) +
            "</td><td>" +
            s.chargers +
            " ตู้/" +
            s.bays +
            " หัว</td><td>" +
            s.sessions +
            "</td><td>" +
            this.fmtNum(s.kwh, 1) +
            "</td><td>฿" +
            this.fmtNum(s.rev, 2) +
            "</td><td>" +
            s.faultCount +
            "</td></tr>",
        )
        .join("");
      const chTr = rep.rpAllChargers
        .map(
          (c) =>
            "<tr><td>" +
            esc(c.unitCode) +
            "</td><td>" +
            esc(c.station) +
            "</td><td>" +
            esc(c.connType) +
            "</td><td>" +
            esc(c.liveLoadText) +
            "</td><td>" +
            c.sessions +
            "</td><td>" +
            this.fmtNum(c.kwh, 1) +
            "</td><td>" +
            esc(c.statText) +
            "</td></tr>",
        )
        .join("");
      const uTr = rep.rpUserRows
        .map(
          (u) =>
            "<tr><td>" +
            esc(u.name) +
            "</td><td>" +
            esc(u.email) +
            "</td><td>" +
            esc(u.userRole) +
            "</td><td>" +
            esc(u.walletStatText) +
            "</td><td>฿" +
            this.fmtNum(u.wallet, 2) +
            "</td></tr>",
        )
        .join("");
      const aTr = rep.rpAccessRows
        .map(
          (a) =>
            "<tr><td>" +
            esc(a.ts) +
            "</td><td>" +
            esc(a.actor) +
            "</td><td>" +
            esc(a.roleText) +
            "</td><td>" +
            esc(a.action) +
            "</td><td>" +
            esc(a.statText) +
            "</td></tr>",
        )
        .join("");
      return (
        '<!doctype html><html lang="th"><head><meta charset="utf-8"><title>Charge X System Report</title><style>@page{size:A4 landscape;margin:10mm}body{font-family:Sarabun,"Segoe UI",sans-serif;color:#1F1F1F;margin:0;padding:12px}h1{margin:0 0 4px;font-size:18px;color:#FC3901}p{margin:0 0 8px;font-size:11.5px;color:#5C5C5C}h2{margin:10px 0 4px;font-size:13px}table{width:100%;border-collapse:collapse;font-size:10.5px;margin-bottom:8px}th,td{border:1px solid #E0E0E0;padding:4px 6px;text-align:left}th{background:#F6F6F6}</style></head><body><h1>Charge X Back Office — รายงานระบบ (Report)</h1><p>' +
        esc(cfg.company) +
        " | ช่วงข้อมูล " +
        esc(rep.fromIso + " – " + rep.toIso) +
        " | รวมชาร์จ " +
        rep.totUsageSess +
        " ครั้ง · " +
        this.fmtNum(rep.totUsageKwh, 1) +
        " kWh · ฿" +
        this.fmtNum(rep.totUsageRev, 2) +
        "</p><h2>1. ยอดใช้งานแยกตามหัวชาร์จ</h2><table><tr><th>หัวชาร์จ</th><th>ตู้</th><th>ครั้ง</th><th>kWh</th><th>รายได้</th><th>สัดส่วน</th></tr>" +
        cTr +
        "</table><h2>2. ยอดใช้งานแยกตามรอบเวลา</h2><table><tr><th>รอบเวลา</th><th>ประเภท</th><th>ครั้ง</th><th>kWh</th><th>รายได้</th></tr>" +
        sTr +
        "</table><h2>3. รายงานสถานีชาร์จไฟฟ้า (" +
        rep.rpStationRows.length +
        " แห่ง)</h2><table><tr><th>สถานี</th><th>เจ้าของ</th><th>ตู้/หัว</th><th>ครั้ง</th><th>kWh</th><th>รายได้</th><th>ขัดข้อง</th></tr>" +
        stTr +
        "</table><h2>4. รายงานตู้ชาร์จไฟฟ้าทั้งหมด (" +
        rep.rpAllChargers.length +
        " ตู้)</h2><table><tr><th>รหัสตู้</th><th>สถานี</th><th>หัวชาร์จ</th><th>โหลด Real-Time</th><th>ครั้ง</th><th>kWh</th><th>สถานะ</th></tr>" +
        chTr +
        "</table><h2>5. รายงานข้อมูลผู้ใช้งาน (" +
        rep.rpUserRows.length +
        " คน)</h2><table><tr><th>ชื่อ</th><th>อีเมล</th><th>User Role</th><th>Wallet</th><th>ยอดคงเหลือ</th></tr>" +
        uTr +
        "</table><h2>6. รายงานการเข้าใช้งานระบบ (" +
        rep.rpAccessRows.length +
        " รายการ)</h2><table><tr><th>เวลา</th><th>ผู้ใช้งาน</th><th>Role</th><th>กิจกรรม</th><th>ผลลัพธ์</th></tr>" +
        aTr +
        "</table></body></html>"
      );
    }
    parseIso(s) {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || "").trim());
      if (!m) return Date.UTC(2026, 10, 17);
      return Date.UTC(
        parseInt(m[1], 10),
        parseInt(m[2], 10) - 1,
        parseInt(m[3], 10),
      );
    }
    toIso(ms) {
      const d = new Date(ms);
      return (
        d.getUTCFullYear() +
        "-" +
        String(d.getUTCMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getUTCDate()).padStart(2, "0")
      );
    }
    fmtThaiDate(ms, withYear) {
      const d = new Date(ms);
      const MO = [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ];
      return (
        d.getUTCDate() +
        " " +
        MO[d.getUTCMonth()] +
        (withYear ? " " + (d.getUTCFullYear() + 543) : "")
      );
    }
    fmtNum(n, dec) {
      const x = Number(n) || 0;
      return dec
        ? x.toLocaleString("en-US", {
            minimumFractionDigits: dec,
            maximumFractionDigits: dec,
          })
        : Math.round(x).toLocaleString("en-US");
    }
    dayStat(ms) {
      const baseMs = Date.UTC(2026, 9, 1);
      const idx = Math.round((ms - baseMs) / 86400000);
      const dow = new Date(ms).getUTCDay();
      const dowMult = [1.14, 0.94, 0.98, 1.02, 1.06, 1.12, 1.18][dow];
      const trend = Math.max(0.5, Math.min(2.2, 0.78 + idx * 0.014));
      const wave = 1 + 0.06 * Math.sin(idx * 0.95);
      const sessions = Math.max(8, Math.round(21 * trend * dowMult * wave));
      const avgKwh = 35.4 + (Math.abs(idx) % 5) * 0.9;
      const kwh = +(sessions * avgKwh).toFixed(1);
      const carbon = +(kwh * 0.45).toFixed(1);
      const rev = +(kwh * 7.5).toFixed(2);
      return {
        ms,
        iso: this.toIso(ms),
        label: this.fmtThaiDate(ms, false),
        sessions,
        kwh,
        carbon,
        rev,
      };
    }
    computeDash(st, accent) {
      const f0 = this.parseIso(st.dFrom),
        t0 = this.parseIso(st.dTo);
      let fromMs = Math.min(f0, t0),
        toMs = Math.max(f0, t0);
      let nDays = Math.max(1, Math.round((toMs - fromMs) / 86400000) + 1);
      if (nDays > 365) {
        nDays = 365;
        fromMs = toMs - 364 * 86400000;
      }
      const curDays = [],
        prevDays = [];
      for (let i = 0; i < nDays; i++) {
        curDays.push(this.dayStat(fromMs + i * 86400000));
        prevDays.push(this.dayStat(fromMs - (nDays - i) * 86400000));
      }
      const sum = (arr, k) => arr.reduce((a, b) => a + b[k], 0);
      const totSess = sum(curDays, "sessions"),
        prevSess = Math.max(1, sum(prevDays, "sessions"));
      const totKwh = +sum(curDays, "kwh").toFixed(1),
        prevKwh = Math.max(1, +sum(prevDays, "kwh").toFixed(1));
      const totCarbon = +(totKwh * 0.45).toFixed(1);
      const totRev = +(totKwh * 7.5).toFixed(2),
        prevRev = +(prevKwh * 7.5).toFixed(2);
      const dailyAvg = +(totSess / nDays).toFixed(1);
      const peakSess = Math.max.apply(
        null,
        curDays.map((x) => x.sessions),
      );
      const growthSess = +(((totSess - prevSess) / prevSess) * 100).toFixed(1);
      const growthKwh = +(((totKwh - prevKwh) / prevKwh) * 100).toFixed(1);
      const monMap = {};
      (st.monitors || []).forEach((m) => {
        monMap[m.id] = m;
      });
      const stationSrc =
        st.stations && st.stations.length ? st.stations : this.seedStations();
      const stations = stationSrc.map((s) => {
        const mon = s.monId ? monMap[s.monId] : null;
        const status = mon ? mon.status : s.status;
        const tb = Math.max(1, Number(s.totalBays) || 2);
        const fb = Number(
          s.freeBays != null ? s.freeBays : Math.max(1, Math.floor(tb / 2)),
        );
        const free =
          status === "maint"
            ? 0
            : status === "charging"
              ? Math.max(0, Math.min(fb, tb - 1))
              : fb;
        const sh = Number(s.share) || 0.1;
        const sessions = Math.max(1, Math.round(totSess * sh));
        const kwh = +(totKwh * sh).toFixed(1);
        const rev = +(kwh * 7.5).toFixed(2);
        return Object.assign({}, s, {
          totalBays: tb,
          status,
          freeBays: free,
          baysText:
            status === "maint"
              ? "ซ่อมบำรุง"
              : "ว่าง " + free + "/" + tb + " หัว",
          sessions,
          kwh,
          rev,
        });
      });
      const stOnline = stations.filter((s) => s.status === "online").length;
      const stChg = stations.filter((s) => s.status === "charging").length;
      const stMaint = stations.filter((s) => s.status === "maint").length;
      const totConn = stations.reduce((a, b) => a + b.totalBays, 0);
      const rawMembers =
        st.members && st.members.length ? st.members : this.seedMembers();
      let liveMb1Bal = null;
      try {
        const sb = localStorage.getItem("cx-wallet-bal");
        if (sb !== null && !isNaN(Number(sb))) liveMb1Bal = Number(sb);
      } catch (e) {}
      const members =
        liveMb1Bal === null
          ? rawMembers
          : rawMembers.map((m) =>
              m.id === "mb1" ? Object.assign({}, m, { wallet: liveMb1Bal }) : m,
            );
      const walletSum = +members.reduce((a, b) => a + b.wallet, 0).toFixed(2);
      const failedSum = +members
        .reduce((a, b) => a + b.uncollected, 0)
        .toFixed(2);
      const failedItems = members.filter((m) => m.uncollected > 0);
      const fromIso = this.toIso(fromMs),
        toIso = this.toIso(toMs);
      const newMembersInPeriod = Math.max(
        1,
        members.filter((m) => m.joinedIso >= fromIso && m.joinedIso <= toIso)
          .length || Math.max(1, Math.round(nDays / 6)),
      );
      const activeMembersInPeriod = Math.min(
        members.length,
        Math.max(
          5,
          Math.round(
            members.length * (nDays === 1 ? 0.55 : nDays <= 7 ? 0.87 : 1),
          ),
        ),
      );
      const growthUsers = +(
        (newMembersInPeriod /
          Math.max(1, members.length - newMembersInPeriod)) *
        100
      ).toFixed(1);
      const metric =
        st.cmpMetric === "kwh" || st.cmpMetric === "rev"
          ? st.cmpMetric
          : "sessions";
      let buckets = [];
      if (nDays === 1) {
        const SLOTS = [
          ["00–04", 0.06],
          ["04–08", 0.09],
          ["08–12", 0.21],
          ["12–16", 0.23],
          ["16–20", 0.26],
          ["20–24", 0.15],
        ];
        buckets = SLOTS.map(([lb, w]) => ({
          label: lb,
          cur: +(curDays[0][metric] * w).toFixed(metric === "sessions" ? 0 : 1),
          prev: +(prevDays[0][metric] * w).toFixed(
            metric === "sessions" ? 0 : 1,
          ),
        }));
      } else if (nDays <= 10) {
        buckets = curDays.map((c, i) => ({
          label: c.label,
          cur: c[metric],
          prev: prevDays[i][metric],
        }));
      } else {
        const grp = 6,
          step = Math.ceil(nDays / grp);
        for (let g = 0; g < grp; g++) {
          const a = g * step,
            b = Math.min(nDays, (g + 1) * step);
          if (a >= nDays) break;
          let cv = 0,
            pv = 0;
          for (let i = a; i < b; i++) {
            cv += curDays[i][metric];
            pv += prevDays[i][metric];
          }
          buckets.push({
            label: curDays[a].label,
            cur: +cv.toFixed(metric === "sessions" ? 0 : 1),
            prev: +pv.toFixed(metric === "sessions" ? 0 : 1),
          });
        }
      }
      const maxBk = Math.max(
        1,
        Math.max.apply(
          null,
          buckets.map((b) => Math.max(b.cur, b.prev)),
        ),
      );
      const cmpBars = buckets.map((b) => {
        const ch = Math.max(8, Math.round((b.cur / maxBk) * 100));
        const ph = Math.max(8, Math.round((b.prev / maxBk) * 100));
        const diffPct =
          b.prev > 0 ? Math.round(((b.cur - b.prev) / b.prev) * 100) : 0;
        const pos = diffPct >= 0;
        const shortVal =
          metric === "rev"
            ? "฿" +
              (b.cur >= 1000
                ? (b.cur / 1000).toFixed(1) + "k"
                : this.fmtNum(b.cur, 0))
            : metric === "kwh"
              ? this.fmtNum(b.cur, 0)
              : String(Math.round(b.cur));
        return {
          label: b.label,
          curValShort: shortVal,
          curBarStyle:
            "width: 14px; border-radius: 999px; background: " +
            accent +
            "; height: " +
            ch +
            "%",
          prevBarStyle:
            "width: 14px; border-radius: 999px; background: #B8BEC8; height: " +
            ph +
            "%",
          deltaText: (pos ? "+" : "") + diffPct + "%",
          deltaStyle:
            "padding: 1px 6px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
            (pos
              ? "background: #E7F6EE; color: #146C3E"
              : "background: #FDECEC; color: #B42318"),
        };
      });
      const cmpCurTotal =
        metric === "sessions" ? totSess : metric === "kwh" ? totKwh : totRev;
      const cmpPrevTotal =
        metric === "sessions" ? prevSess : metric === "kwh" ? prevKwh : prevRev;
      const cmpUnit =
        metric === "sessions" ? "ครั้ง" : metric === "kwh" ? "kWh" : "฿";
      const cmpDiffPct = +(
        ((cmpCurTotal - cmpPrevTotal) / Math.max(1, cmpPrevTotal)) *
        100
      ).toFixed(1);
      const cmpDiffAbs = +(cmpCurTotal - cmpPrevTotal).toFixed(
        metric === "sessions" ? 0 : 1,
      );
      const rangeStr =
        (fromMs === toMs
          ? this.fmtThaiDate(fromMs, true)
          : this.fmtThaiDate(fromMs, false) +
            " – " +
            this.fmtThaiDate(toMs, true)) +
        " (" +
        nDays +
        " วัน)";
      return {
        fromIso,
        toIso,
        nDays,
        rangeStr,
        totSess,
        prevSess,
        totKwh,
        prevKwh,
        totCarbon,
        totRev,
        prevRev,
        dailyAvg,
        peakSess,
        growthSess,
        growthKwh,
        growthUsers,
        stations,
        stOnline,
        stChg,
        stMaint,
        totConn,
        members,
        walletSum,
        failedSum,
        failedCount: failedItems.length,
        activeMembersInPeriod,
        newMembersInPeriod,
        metric,
        cmpBars,
        cmpCurTotal,
        cmpPrevTotal,
        cmpUnit,
        cmpDiffPct,
        cmpDiffAbs,
        curDays,
      };
    }
    buildExcelXml(dash) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const row = (cells, hdr) =>
        "<Row>" +
        cells
          .map((c) => {
            const num = typeof c === "number" && isFinite(c);
            return (
              "<Cell" +
              (hdr ? ' ss:StyleID="h"' : "") +
              '><Data ss:Type="' +
              (num ? "Number" : "String") +
              '">' +
              esc(c) +
              "</Data></Cell>"
            );
          })
          .join("") +
        "</Row>";
      const sheet = (name, rows) =>
        '<Worksheet ss:Name="' +
        esc(name) +
        '"><Table>' +
        rows.join("") +
        "</Table></Worksheet>";
      const s1 = [
        row(["Charge X Back Office — Executive Dashboard Report"], true),
        row(["ช่วงเวลาข้อมูล", dash.rangeStr]),
        row(["หัวข้อตัวชี้วัด", "ค่าที่ตรวจวัด", "รายละเอียดเพิ่มเติม"], true),
        row([
          "สถานีชาร์จทั้งหมด",
          dash.stations.length,
          "ออนไลน์ " +
            dash.stOnline +
            " · กำลังชาร์จ " +
            dash.stChg +
            " · บำรุงรักษา " +
            dash.stMaint,
        ]),
        row([
          "ผู้ใช้งานในระบบ (คน)",
          dash.members.length,
          "ใช้งานช่วงนี้ " +
            dash.activeMembersInPeriod +
            " · สมัครใหม่ +" +
            dash.newMembersInPeriod,
        ]),
        row([
          "ยอดเงินคงค้างใน Wallet รวม (บาท)",
          dash.walletSum,
          "รวมกระเป๋าเงินสมาชิกทั้งหมดในระบบ",
        ]),
        row([
          "ยอดที่ตัดไม่ได้ (บาท)",
          dash.failedSum,
          dash.failedCount + " รายการค้างชำระ",
        ]),
        row([
          "พลังงานที่ชาร์จรวม (kWh)",
          dash.totKwh,
          "ลด Carbon " + dash.totCarbon + " kg CO2",
        ]),
        row(["รายได้รวม (บาท)", dash.totRev, "อัตราเฉลี่ย ฿7.50/kWh"]),
        row([
          "จำนวนการชาร์จต่อวัน (ครั้ง/วัน)",
          dash.dailyAvg,
          "รวม " +
            dash.totSess +
            " ครั้ง · สูงสุด " +
            dash.peakSess +
            " ครั้ง/วัน",
        ]),
        row([
          "การเติบโตของการใช้งาน (%)",
          dash.growthSess,
          "พลังงาน " + (dash.growthKwh >= 0 ? "+" : "") + dash.growthKwh + "%",
        ]),
      ];
      const s2 = [
        row(
          [
            "ช่วง/วันที่",
            "การชาร์จ (ครั้ง)",
            "พลังงาน (kWh)",
            "ลด Carbon (kg CO2)",
            "รายได้ (บาท)",
          ],
          true,
        ),
      ].concat(
        dash.curDays.map((d) =>
          row([d.iso, d.sessions, d.kwh, d.carbon, d.rev]),
        ),
      );
      const s3 = [
        row(
          [
            "สถานีชาร์จ",
            "พื้นที่",
            "กำลังไฟ / หัวชาร์จ",
            "หัวชาร์จว่าง",
            "ครั้งชาร์จ",
            "พลังงาน (kWh)",
            "รายได้ (บาท)",
            "สถานะ",
          ],
          true,
        ),
      ].concat(
        dash.stations.map((s) =>
          row([
            s.name,
            s.area,
            s.power,
            s.baysText,
            s.sessions,
            s.kwh,
            s.rev,
            s.status,
          ]),
        ),
      );
      const s4 = [
        row(
          [
            "ชื่อสมาชิก",
            "อีเมล",
            "เบอร์โทร",
            "รถ EV",
            "วันสมัคร",
            "ครั้งชาร์จ",
            "พลังงาน (kWh)",
            "ยอดใน Wallet (บาท)",
            "ยอดตัดไม่ได้ (บาท)",
            "สถานะ",
          ],
          true,
        ),
      ].concat(
        dash.members.map((m) =>
          row([
            m.name,
            m.email,
            m.phone,
            m.car,
            m.joinedIso,
            m.sessions,
            m.kwh,
            m.wallet,
            m.uncollected,
            m.uncollected > 0 ? "ค้างตัดชำระ" : "ใช้งานปกติ",
          ]),
        ),
      );
      return (
        '<?xml version="1.0" encoding="UTF-8"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="h"><Font ss:Bold="1"/></Style></Styles>' +
        sheet("Summary", s1) +
        sheet("Daily", s2) +
        sheet("Stations", s3) +
        sheet("Members", s4) +
        "</Workbook>"
      );
    }
    buildPdfHtml(dash) {
      const esc = (v) =>
        String(v == null ? "" : v)
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      const stTr = dash.stations
        .map(
          (s) =>
            "<tr><td>" +
            esc(s.name) +
            "</td><td>" +
            esc(s.power) +
            "</td><td>" +
            s.sessions +
            "</td><td>" +
            this.fmtNum(s.kwh, 1) +
            "</td><td>฿" +
            this.fmtNum(s.rev, 2) +
            "</td><td>" +
            esc(s.status) +
            "</td></tr>",
        )
        .join("");
      const mbTr = dash.members
        .map(
          (m) =>
            "<tr><td>" +
            esc(m.name) +
            "</td><td>" +
            esc(m.email) +
            "</td><td>" +
            esc(m.car) +
            "</td><td>฿" +
            this.fmtNum(m.wallet, 2) +
            "</td><td>฿" +
            this.fmtNum(m.uncollected, 2) +
            "</td></tr>",
        )
        .join("");
      return (
        '<!doctype html><html lang="th"><head><meta charset="utf-8"><title>Charge X Dashboard Report</title><style>@page{size:A4;margin:12mm}body{font-family:Sarabun,"Segoe UI",sans-serif;color:#1F1F1F;margin:0;padding:16px;-webkit-print-color-adjust:exact;print-color-adjust:exact}h1{margin:0 0 4px;font-size:20px;color:#FC3901}p{margin:0 0 12px;font-size:12px;color:#5C5C5C}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}.c{border:1px solid #E0E0E0;border-radius:10px;padding:8px 10px}.l{font-size:11px;color:#6B6B6B}.v{font-size:16px;font-weight:700}h2{margin:12px 0 6px;font-size:14px}table{width:100%;border-collapse:collapse;font-size:11.5px;margin-bottom:10px}th,td{border:1px solid #E0E0E0;padding:5px 7px;text-align:left}th{background:#F6F6F6}</style></head><body><h1>Charge X Back Office — รายงานแผงบริหาร (Dashboard)</h1><p>ช่วงข้อมูล: ' +
        esc(dash.rangeStr) +
        " | สถานีทั้งหมด " +
        dash.stations.length +
        " แห่ง | สมาชิกทั้งหมด " +
        dash.members.length +
        ' คน</p><div class="g"><div class="c"><div class="l">สถานีชาร์จทั้งหมด</div><div class="v">' +
        dash.stations.length +
        " สถานี (" +
        dash.totConn +
        ' หัว)</div></div><div class="c"><div class="l">ผู้ใช้งานในระบบ</div><div class="v">' +
        dash.members.length +
        " คน (ใช้งาน " +
        dash.activeMembersInPeriod +
        ')</div></div><div class="c"><div class="l">Wallet รวม / ยอดตัดไม่ได้</div><div class="v">฿' +
        this.fmtNum(dash.walletSum, 2) +
        " / ฿" +
        this.fmtNum(dash.failedSum, 2) +
        '</div></div><div class="c"><div class="l">พลังงานรวม &amp; ลด Carbon</div><div class="v">' +
        this.fmtNum(dash.totKwh, 1) +
        " kWh (" +
        this.fmtNum(dash.totCarbon, 1) +
        ' kg CO₂)</div></div><div class="c"><div class="l">จำนวนการชาร์จต่อวัน</div><div class="v">' +
        dash.dailyAvg +
        ' ครั้ง/วัน</div></div><div class="c"><div class="l">การเติบโตของการใช้งาน</div><div class="v">' +
        (dash.growthSess >= 0 ? "+" : "") +
        dash.growthSess +
        "%</div></div></div><h2>ข้อมูลสถานีชาร์จทั้งหมด</h2><table><tr><th>สถานีชาร์จ</th><th>กำลังไฟ</th><th>ครั้งชาร์จ</th><th>kWh</th><th>รายได้</th><th>สถานะ</th></tr>" +
        stTr +
        "</table><h2>รายชื่อสมาชิกในระบบทั้งหมด (" +
        dash.members.length +
        " คน)</h2><table><tr><th>ชื่อ-นามสกุล</th><th>อีเมล</th><th>รถ EV</th><th>Wallet</th><th>ยอดตัดไม่ได้</th></tr>" +
        mbTr +
        "</table></body></html>"
      );
    }
    makeSecurePw() {
      const pick = (s) => {
        if (typeof crypto !== "undefined" && crypto.getRandomValues) {
          const u = new Uint32Array(1);
          crypto.getRandomValues(u);
          return s[u[0] % s.length];
        }
        return s[Math.floor(Math.random() * s.length)];
      };
      const U = "ABCDEFGHJKLMNPQRSTUVWXYZ",
        L = "abcdefghijkmnpqrstuvwxyz",
        D = "23456789",
        S = "@#$%!&*";
      const all = U + L + D + S;
      const arr = [pick(U), pick(L), pick(D), pick(S)];
      while (arr.length < 12) arr.push(pick(all));
      for (let i = arr.length - 1; i > 0; i--) {
        const j = pick(arr.map((_, k) => k));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
      }
      return arr.join("");
    }
    checkPw(pw) {
      const s = String(pw || "");
      const len = s.length >= 8;
      const upper = /[A-Z]/.test(s);
      const lower = /[a-z]/.test(s);
      const digit = /[0-9]/.test(s);
      const sym = /[^A-Za-z0-9\s]/.test(s);
      return {
        len,
        upper,
        lower,
        digit,
        sym,
        ok: len && upper && lower && digit && sym,
      };
    }
    isCorpEmail(em) {
      return /^[^\s@]+@chargex\.co\.th$/i.test(String(em || "").trim());
    }
    saveStore(k, v) {
      try {
        localStorage.setItem(k, JSON.stringify(v));
      } catch (e) {}
    }
  }
  function install(P) {
    for (const k of Object.getOwnPropertyNames(CoreProto.prototype)) {
      if (k !== "constructor") P[k] = CoreProto.prototype[k];
    }
  }
  globalThis.CX_BO_CORE = {
    init(cmp, props) {
      init.call(cmp, props);
    },
    install,
  };
})();
