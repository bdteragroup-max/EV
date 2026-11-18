(function () {
  globalThis.CX_BO_SECTIONS = {
    renderVals: function () {
      const accent = this.props.accent ?? "#FC3901";
      const d = this.props.theme === "dark";
      const st = this.state;
      const en = this.cxLang() === "en";
      const fireToast = (msg, withUndo) => {
        clearTimeout(this._toastT);
        this.setState(
          withUndo
            ? { toast: msg }
            : {
                toast: msg,
                nwUndo: null,
                tutUndo: null,
                cpUndo: null,
                stUndo: null,
                umUndo: null,
                catUndo: null,
              },
        );
        this._toastT = setTimeout(
          () =>
            this.setState({
              toast: "",
              nwUndo: null,
              tutUndo: null,
              cpUndo: null,
              stUndo: null,
              umUndo: null,
              catUndo: null,
            }),
          3500,
        );
      };
      const pwRules = (pw) => {
        const r = this.checkPw(pw);
        return [
          ["len", "8+ ตัว"],
          ["upper", "A–Z"],
          ["lower", "a–z"],
          ["digit", "0–9"],
          ["sym", "สัญลักษณ์"],
        ].map(([k, label]) => {
          const ok = r[k];
          return {
            label,
            mark: ok ? "✓" : "○",
            style:
              "display: flex; align-items: center; justify-content: center; gap: 3px; height: 30px; box-sizing: border-box; padding: 0 3px; border-radius: 999px; font-size: 12px; font-weight: 600; white-space: nowrap; " +
              (ok
                ? "background: #E7F6EE; color: #146C3E; border: 1px solid transparent"
                : "background: #FFFFFF; color: #6B6B6B; border: 1px solid #E0E0E0"),
          };
        });
      };
      const rolesList = (
        st.roles && st.roles.length ? st.roles : this.seedRoles()
      ).map((r) => this.normRole(r));
      const teamsList = (
        st.teams && st.teams.length ? st.teams : this.seedTeams()
      ).map((t) => this.normTeam(t));
      const permDefs = this.permDefs();
      const permLabelMap = {};
      permDefs.forEach(([k, lbl]) => {
        permLabelMap[k] = lbl;
      });
      const normUsers = st.users.map((u) => this.normAdminUser(u, rolesList));
      const curUser = normUsers.find((u) => u.id === st.curId) || null;
      const isSuper = !!curUser && curUser.role === "super_admin";
      const ALL_TABS = [
        "dashboard",
        "operators",
        "stations",
        "coupons",
        "news",
        "monitor",
        "tutorial",
        "payments",
        "reports",
        "settings",
      ];
      const curPerms = isSuper
        ? ALL_TABS
        : curUser && Array.isArray(curUser.perms) && curUser.perms.length
          ? curUser.perms
          : ["coupons", "news", "monitor"];
      const canView = (id) => isSuper || curPerms.indexOf(id) >= 0;
      const allowedTabs = isSuper
        ? ALL_TABS
        : ALL_TABS.filter((id) => curPerms.indexOf(id) >= 0);
      const activeTab =
        allowedTabs.indexOf(st.tab) >= 0 ? st.tab : allowedTabs[0];
      const NAV = {
        dashboard: {
          label: "แผงบริหาร (Dashboard)",
          icon: "M3 3h7v9H3V3zM14 3h7v5h-7V3zM14 12h7v9h-7v-9zM3 16h7v5H3v-5z",
          badge: "",
        },
        operators: {
          label: "จัดการผู้ใช้ & Operator",
          icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8a4 4 0 1 0 0-8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
          badge: String(normUsers.length + (st.members || []).length),
        },
        stations: {
          label: "จัดการสถานีชาร์จ (Stations)",
          icon: "M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21zM13 7l-3 5h3l-1 4 4-6h-3z",
          badge: String((st.stations || []).length),
        },
        coupons: {
          label: "คูปองและโปรโมชั่น",
          icon: "M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8zM9 9h.01M15 15h.01M15 9l-6 6",
          badge: String(st.coupons.filter((c) => c.status === "avail").length),
        },
        news: {
          label: "แจ้งเตือนและข่าวสาร",
          icon: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
          badge: String(st.news.filter((n) => n.status === "published").length),
        },
        monitor: {
          label: "Monitor ตู้ชาร์จ",
          icon: "M3 12h4l3-7 4 14 3-7h4",
          badge: String(st.monitors.filter((m) => m.status !== "maint").length),
        },
        tutorial: {
          label: "การสอนใช้งาน (Tutorial)",
          icon: "M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2zM4 20a2 2 0 0 0 2 2h13v-4M9 8h6M9 12h4",
          badge: String(st.tutorials.length),
        },
        payments: {
          label: "การชำระเงิน (Payment)",
          icon: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7zM2 10h20M7 15h3",
          badge: String(
            (st.payments || []).filter(
              (p) => p.status === "pending" || p.status === "failed",
            ).length,
          ),
        },
        reports: {
          label: "รายงานระบบ (Report)",
          icon: "M3 3v18h18M7 16v-5M12 16V7M17 16v-8",
          badge: String((st.accessLogs || []).length),
        },
        settings: {
          label: "ตั้งค่าระบบ (Setting)",
          icon: "M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.6.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
          badge: String((st.categories || []).length),
        },
      };
      const navItems = allowedTabs.map((id) => {
        const on = activeTab === id;
        return {
          label: NAV[id].label,
          icon: NAV[id].icon,
          badge: NAV[id].badge,
          hasBadge: !!NAV[id].badge,
          isOn: on,
          pick: () => {
            clearInterval(this._tutT);
            this.setState({
              tab: id,
              modal: "",
              modalErr: "",
              tutAutoPlay: false,
              langMenuOpen: false,
              umDrop: "",
              umMenuId: "",
              stMenuId: "",
              rpDrop: "",
            });
          },
          style:
            "width: 100%; height: 42px; padding: 0 12px; border-radius: 999px 0 0 999px; border: 0; font-family: inherit; font-size: 14px; font-weight: " +
            (on ? 700 : 500) +
            "; cursor: pointer; display: flex; align-items: center; gap: 8px; " +
            (on
              ? "background: #F4F5F7; color: #1F1F1F"
              : "background: transparent; color: #D4D4D8"),
          badgeStyle:
            "padding: 1px 7px; border-radius: 999px; font-size: 12.5px; font-weight: 700; " +
            (on
              ? "background: #FFF1EB; color: #C42D00"
              : "background: rgba(255,255,255,0.14); color: #FFFFFF"),
          railStyle:
            "width: 38px; height: 38px; border-radius: 12px; border: 0; cursor: pointer; display: flex; align-items: center; justify-content: center; " +
            (on
              ? "background: rgba(255,255,255,0.26); color: #FFFFFF"
              : "background: transparent; color: #FFFFFF"),
        };
      });
      const PAGE_META = {
        dashboard: [
          "แผงบริหาร (Dashboard)",
          "ภาพรวมสถานีชาร์จ สมาชิก ยอดเงินใน Wallet พลังงาน และรายงานเปรียบเทียบ",
        ],
        operators: [
          "การจัดการผู้ใช้งานระบบ (User Management)",
          "จัดการบัญชีผู้ดูแลระบบ สมาชิก บทบาท สิทธิ์การเข้าถึง กลุ่มทีม รหัสผ่าน และสถานะ Active / Inactive",
        ],
        stations: [
          "การจัดการสถานีชาร์จไฟฟ้ารถยนต์ (Station Management)",
          "บริหารข้อมูลโครงสร้างพื้นฐาน พิกัดแผนที่ ผู้ดูแลพื้นที่ สถิติเหตุขัดข้อง และส่งออกรายงาน",
        ],
        coupons: [
          "กำหนดคูปองส่วนลดและโปรโมชั่น",
          "จัดการคูปองส่วนลดค่าชาร์จและโบนัสเติมเงินของแพลตฟอร์ม",
        ],
        news: [
          "แจ้งเตือนและข่าวสาร (Notifications)",
          "สร้าง แก้ไข ตั้งเวลาเผยแพร่ข่าวสารล่วงหน้า และจัดการสถานะการแจ้งเตือนถึงสมาชิก",
        ],
        monitor: [
          "Monitor ตู้ชาร์จ",
          "ตรวจสอบสถานะสถานีชาร์จและหัวชาร์จแบบ Real-time",
        ],
        tutorial: [
          "การสอนใช้งาน (Tutorial)",
          "จัดลำดับหน้าสอนใช้งาน ตั้งค่าการแสดงซ้ำในแอป และทดสอบสไลด์โชว์ผ่านจอมือถือจำลอง",
        ],
        payments: [
          "การจัดการการชำระเงิน (Payment Management)",
          "จัดการรายการชำระเงิน สถานะ ออกใบแจ้งหนี้/ใบกำกับภาษี ตรวจสอบ Gateway และกระเป๋าเงินผู้ใช้ (เฉพาะ Super Admin)",
        ],
        reports: [
          "รายงานและการวิเคราะห์ระบบ (Report)",
          "สรุปยอดใช้งาน ข้อมูลผู้ใช้ การเข้าใช้งานระบบ สถานี ตู้ชาร์จทั้งหมด พร้อม Filter และ Real Time (เฉพาะ Super Admin)",
        ],
        settings: [
          "การตั้งค่าระบบและความปลอดภัย (Settings)",
          "จัดการภาพโปรไฟล์ รหัสผ่าน ภาษา Terms & Conditions Privacy Policy สิทธิ์ข้อมูล และหมวดหมู่",
        ],
      };
      const nwBtnStyle = (on) =>
        "height: 36px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 14px; font-weight: " +
        (on ? 700 : 600) +
        "; cursor: pointer; " +
        (on
          ? "border: 0; background: " + accent + "; color: #FFFFFF"
          : "border: 1px solid #E0E0E0; background: #F6F6F6; color: #3A3A3A");
      const cpList = st.coupons.map((raw) => this.normCoupon(raw));
      const cpAvailCount = cpList.filter((c) => c.status === "avail").length;
      const cpNewUserCount = cpList.filter((c) => c.newUserOnly).length;
      const cpRemainSum = cpList.reduce(
        (sum, c) => sum + Math.max(0, c.totalQty - c.usedQty),
        0,
      );
      const cpKpis = [
        {
          label: "คูปองทั้งหมด",
          val: String(cpList.length) + " รายการ",
          fg: "#1F1F1F",
        },
        {
          label: "กำลังเปิดใช้งาน",
          val: String(cpAvailCount) + " รายการ",
          fg: "#146C3E",
        },
        {
          label: "สำหรับผู้ใช้ใหม่",
          val: String(cpNewUserCount) + " รายการ",
          fg: "#C42D00",
        },
        {
          label: "จำนวนคงเหลือในระบบ",
          val: this.fmtNum(cpRemainSum) + " สิทธิ์",
          fg: "#1F1F1F",
        },
      ];
      const cpFilterVal =
        ["avail", "newuser", "stackable", "membership"].indexOf(st.cpFilter) >=
        0
          ? st.cpFilter
          : "all";
      const cpFilters = [
        ["all", "ทั้งหมด"],
        ["avail", "เปิดใช้งาน"],
        ["newuser", "สำหรับผู้ใช้ใหม่"],
        ["stackable", "ใช้ร่วมกับคูปองอื่นได้"],
        ["membership", "Membership"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ cpFilter: id }),
        style: nwBtnStyle(cpFilterVal === id),
      }));
      const cpQ = String(st.cpSearch || "")
        .trim()
        .toLowerCase();
      const filteredCoupons = cpList.filter((c) => {
        if (cpFilterVal === "avail" && c.status !== "avail") return false;
        if (cpFilterVal === "newuser" && !c.newUserOnly) return false;
        if (cpFilterVal === "stackable" && !c.stackable) return false;
        if (
          cpFilterVal === "membership" &&
          c.usageType !== "Membership" &&
          c.usageType !== "ทั้งหมด (สินค้า & Membership)"
        )
          return false;
        if (
          cpQ &&
          (c.code + " " + c.title + " " + c.usageType + " " + c.cond)
            .toLowerCase()
            .indexOf(cpQ) < 0
        )
          return false;
        return true;
      });
      const couponCards = filteredCoupons.map((c) => {
        const on = c.status === "avail";
        const rem = Math.max(0, c.totalQty - c.usedQty);
        const remPct = Math.max(
          0,
          Math.min(100, Math.round((rem / Math.max(1, c.totalQty)) * 100)),
        );
        const discShort =
          c.discUnit === "pct" ? c.discVal + "%" : "฿" + this.fmtNum(c.discVal);
        const discUnitSub =
          c.discUnit === "pct"
            ? "ส่วนลดเปอร์เซ็น" +
              (c.maxDisc > 0 ? " · สูงสุด ฿" + this.fmtNum(c.maxDisc) : "")
            : "หน่วยจำนวนเงิน";
        const discLabel =
          c.discUnit === "pct"
            ? "ส่วนลดเปอร์เซ็น · ลด " +
              c.discVal +
              "%" +
              (c.maxDisc > 0 ? " (สูงสุด ฿" + c.maxDisc + ")" : "")
            : "หน่วยจำนวนเงิน · ลด ฿" + c.discVal;
        const usageBadgeStyle =
          "display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; " +
          (c.usageType === "Membership"
            ? "background: #FFF4E0; color: #B86A00"
            : c.usageType === "เติมเงิน Wallet"
              ? "background: #E7F6EE; color: #146C3E"
              : c.usageType === "ทั้งหมด (สินค้า & Membership)"
                ? "background: #FFF1EB; color: #C42D00"
                : "background: #F6F6F6; color: #3A3A3A");
        const minAmtAlign =
          c.minSpend > 0 ? "฿" + this.fmtNum(c.minSpend, 2) : "ไม่มีขั้นต่ำ";
        const minAmtStyle =
          "font-size: 13.5px; font-weight: " +
          (c.minSpend > 0 ? "700; color: #1F1F1F" : "600; color: #6B6B6B") +
          "; font-variant-numeric: tabular-nums; white-space: nowrap";
        const barFill =
          rem === 0 ? "#B42318" : remPct < 25 ? "#B86A00" : "#146C3E";
        const quotaBarStyle =
          "height: 100%; width: " +
          remPct +
          "%; border-radius: 999px; background: " +
          barFill;
        const sDateTxt = this.fmtThaiDate(this.parseIso(c.startDate), true);
        const eDateTxt = this.fmtThaiDate(this.parseIso(c.endDate), true);
        return {
          code: c.code,
          title: c.title,
          cond: c.cond,
          exp: c.exp,
          usageType: c.usageType,
          usageBadgeStyle,
          newUserOnly: !!c.newUserOnly,
          discLabel,
          discShort,
          discUnitSub,
          minText:
            c.minSpend > 0
              ? "ขั้นต่ำ ฿" + this.fmtNum(c.minSpend)
              : "ไม่มีขั้นต่ำ",
          minAmtAlign,
          minAmtStyle,
          qtyText:
            this.fmtNum(c.totalQty) +
            " สิทธิ์ (คงเหลือ " +
            this.fmtNum(rem) +
            ")",
          quotaFraction:
            this.fmtNum(rem) + " / " + this.fmtNum(c.totalQty) + " สิทธิ์",
          quotaBarStyle,
          perUserText: String(c.perUserLimit) + " ครั้ง / 1 ผู้ใช้",
          dateRangeText: sDateTxt + " – " + eDateTxt,
          stackText: c.stackable
            ? "ใช้ร่วมกับคูปองอื่นได้"
            : "ไม่สามารถใช้ร่วมกับคูปองอื่น",
          stackShortText: c.stackable
            ? "ใช้ร่วมกับคูปองอื่นได้"
            : "ไม่ร่วมกับคูปองอื่น",
          stackStyle:
            "font-size: 12px; font-weight: 700; color: " +
            (c.stackable ? "#146C3E" : "#6B6B6B"),
          audienceLabel:
            "กลุ่มผู้ใช้: " +
            (c.newUserOnly ? "เฉพาะผู้ใช้ใหม่" : "ผู้ใช้ทุกกลุ่ม"),
          statText: on
            ? "เปิดใช้งาน"
            : c.status === "used"
              ? "ใช้"
              : "ปิดใช้งาน",
          statStyle:
            "padding: 3px 9px; border-radius: 999px; font-size: 13px; font-weight: 700; " +
            (on
              ? "background: #E7F6EE; color: #146C3E"
              : "background: #F4F4F4; color: #6B6B6B"),
          onStr: on ? "true" : "false",
          switchStyle:
            "width: 40px; height: 22px; padding: 2.5px; box-sizing: border-box; border-radius: 999px; border: 0; display: inline-flex; align-items: center; cursor: pointer; flex: none; " +
            (on
              ? "background: #146C3E; justify-content: flex-end"
              : "background: #D4D4D8; justify-content: flex-start"),
          knobStyle:
            "width: 17px; height: 17px; border-radius: 50%; background: #FFFFFF; box-shadow: 0 1px 3px rgba(15,23,42,0.22); display: block; flex: none",
          toggleLabel: on ? "ปิดใช้งาน" : "เปิดใช้งาน",
          toggle: () => {
            const next = st.coupons.map((x) =>
              x.id === c.id
                ? Object.assign({}, x, { status: on ? "disabled" : "avail" })
                : x,
            );
            this.saveStore("cx-wallet-coupons", next);
            this.setState({ coupons: next });
            fireToast("อัปเดตสถานะคูปองแล้ว");
          },
          edit: () => {
            this.setState({
              modal: "coupon",
              modalErr: "",
              cpEditId: c.id,
              cpCode: c.code,
              cpTitle: c.title || "",
              cpDiscType: c.discUnit === "pct" ? "pct" : "flat",
              cpUsageType: c.usageType || "สินค้าและบริการ",
              cpVal: String(c.discVal || ""),
              cpMaxDisc: String(c.maxDisc || c.discVal || ""),
              cpMin: String(c.minSpend || 0),
              cpTotalQty: String(c.totalQty || 500),
              cpPerUser: String(c.perUserLimit || 1),
              cpStartDate: c.startDate || this.todayIso(),
              cpEndDate: c.endDate || "2026-12-31",
              cpStackable: !!c.stackable,
              cpNewUserOnly: !!c.newUserOnly,
              cpStatus: c.status === "disabled" ? "disabled" : "avail",
            });
          },
          del: () => {
            const idx = st.coupons.findIndex((x) => x.id === c.id);
            const next = st.coupons.filter((x) => x.id !== c.id);
            this.saveStore("cx-wallet-coupons", next);
            this.setState({
              coupons: next,
              cpUndo: c,
              cpUndoIdx: idx < 0 ? 0 : idx,
              nwUndo: null,
              tutUndo: null,
              stUndo: null,
            });
            fireToast("ลบคูปองแล้ว", true);
          },
        };
      });
      const nwPubCount = st.news.filter(
        (n) => n.status === "published" && n.sendMode !== "scheduled",
      ).length;
      const nwSchedCount = st.news.filter(
        (n) => n.status === "published" && n.sendMode === "scheduled",
      ).length;
      const nwDraftCount = st.news.filter((n) => n.status === "draft").length;
      const nwKpis = [
        {
          label: "การแจ้งเตือนทั้งหมด",
          val: String(st.news.length),
          fg: "#1F1F1F",
        },
        { label: "เผยแพร่แล้ว", val: String(nwPubCount), fg: "#146C3E" },
        { label: "ตั้งเวลาล่วงหน้า", val: String(nwSchedCount), fg: "#C42D00" },
        { label: "แบบร่าง", val: String(nwDraftCount), fg: "#5C5C5C" },
      ];
      const nwFilterVal =
        ["published", "scheduled", "draft"].indexOf(st.nwFilter) >= 0
          ? st.nwFilter
          : "all";
      const nwFilters = [
        ["all", "ทั้งหมด", String(st.news.length)],
        ["published", "เผยแพร่แล้ว", String(nwPubCount)],
        ["scheduled", "ตั้งเวลาล่วงหน้า", String(nwSchedCount)],
        ["draft", "แบบร่าง", String(nwDraftCount)],
      ].map(([id, label, count]) => {
        const on = nwFilterVal === id;
        return {
          label,
          count,
          hasDot: id === "published" || id === "draft",
          isClock: id === "scheduled",
          dotStyle:
            "width: 7px; height: 7px; border-radius: 50%; flex: none; background: " +
            (id === "published" ? "#146C3E" : "#8A8A8E"),
          cntStyle:
            "min-width: 19px; height: 19px; padding: 0 5px; border-radius: 999px; font-size: 11.5px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; " +
            (on
              ? "background: " + accent + "; color: #FFFFFF"
              : "background: #E6E6E6; color: #3A3A3A"),
          pick: () => this.setState({ nwFilter: id }),
          style:
            "height: 34px; padding: 0 9px; border-radius: 9px; font-family: inherit; font-size: 13px; font-weight: " +
            (on ? 700 : 600) +
            "; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; " +
            (on
              ? "border: 1.5px solid " +
                accent +
                "; background: #FFF1EB; color: #C42D00"
              : "border: 1px solid #E0E0E0; background: #F6F6F6; color: #3A3A3A"),
        };
      });
      const nq = String(st.nwSearch || "")
        .trim()
        .toLowerCase();
      const filteredNews = st.news.filter((n) => {
        const isSched = n.sendMode === "scheduled";
        if (nwFilterVal === "draft" && n.status !== "draft") return false;
        if (
          nwFilterVal === "scheduled" &&
          !(n.status === "published" && isSched)
        )
          return false;
        if (
          nwFilterVal === "published" &&
          !(n.status === "published" && !isSched)
        )
          return false;
        if (
          nq &&
          (
            String(n.title || "") +
            " " +
            String(n.body || "") +
            " " +
            String(n.tag || "")
          )
            .toLowerCase()
            .indexOf(nq) < 0
        )
          return false;
        return true;
      });
      const newsCards = filteredNews.map((n) => {
        const pub = n.status === "published";
        const sched = pub && n.sendMode === "scheduled";
        const tag = n.tag || "ข่าวสาร";
        const isSelected = st.nwPanelOpen !== false && st.nwEditId === n.id;
        const dateRaw = String(n.date || "");
        const dateShort = dateRaw.replace(/^ตั้งเวลา\s*/, "");
        const hasSchedInfo = sched && !!dateShort;
        return {
          tag,
          title: n.title,
          date: n.date,
          dateShort,
          body: n.body,
          hasSchedInfo,
          schedInfo: hasSchedInfo ? "ตั้งเวลา: " + dateShort : "",
          cardStyle:
            "border-radius: 16px; padding: 15px 16px; display: flex; align-items: stretch; justify-content: space-between; gap: 16px; " +
            (isSelected
              ? "border: 1.5px solid " + accent + "; background: #FFF7F3"
              : "border: 1px solid #E6E6E6; background: #FFFFFF"),
          catStyle:
            "padding: 2px 9px; border-radius: 999px; font-size: 12.5px; font-weight: 700; white-space: nowrap; " +
            (tag === "โปรโมชัน"
              ? "background: #FFF1EB; color: #C42D00"
              : tag === "สถานีใหม่"
                ? "background: #E7F6EE; color: #146C3E"
                : tag === "ประกาศ"
                  ? "background: #FFF4E0; color: #B86A00"
                  : "background: #F6F6F6; color: #3A3A3A"),
          statText: !pub ? "แบบร่าง" : sched ? "ตั้งเวลาล่วงหน้า" : "เผยแพร่",
          statStyle:
            "padding: 2px 9px; border-radius: 999px; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; " +
            (!pub
              ? "background: #F4F4F4; color: #6B6B6B"
              : sched
                ? "background: #FFF4E0; color: #B86A00"
                : "background: #E7F6EE; color: #146C3E"),
          isStatDot: !sched,
          isStatClock: sched,
          statDotStyle:
            "width: 6px; height: 6px; border-radius: 50%; flex: none; background: " +
            (pub ? "#146C3E" : "#8A8A8E"),
          isPubStr: pub ? "true" : "false",
          toggleLabel: pub ? "เป็นแบบร่าง" : "เผยแพร่",
          toggleStyle:
            "height: 32px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 14px; font-weight: 600; cursor: pointer; " +
            (pub
              ? "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"
              : "border: 0; background: #E7F6EE; color: #146C3E"),
          switchStyle:
            "width: 42px; height: 24px; padding: 3px; box-sizing: border-box; border-radius: 999px; border: 0; display: flex; align-items: center; cursor: pointer; flex: none; " +
            (pub
              ? "background: #146C3E; justify-content: flex-end"
              : "background: #D4D4D8; justify-content: flex-start"),
          knobStyle:
            "width: 18px; height: 18px; border-radius: 50%; background: #FFFFFF; box-shadow: 0 1px 3px rgba(15,23,42,0.22); display: block; flex: none",
          toggle: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            const nextStat = pub ? "draft" : "published";
            const next = st.news.map((x) =>
              x.id === n.id ? Object.assign({}, x, { status: nextStat }) : x,
            );
            this.saveStore("cx-bo-news", next);
            this.setState(
              Object.assign(
                { news: next },
                st.nwEditId === n.id ? { nwStatus: nextStat } : {},
              ),
            );
            fireToast(
              pub
                ? "เปลี่ยนสถานะเป็นแบบร่างแล้ว"
                : "เปลี่ยนสถานะเป็นเผยแพร่แล้ว",
            );
          },
          edit: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            this.setState({
              modal: "news",
              modalErr: "",
              nwPanelOpen: true,
              nwEditId: n.id,
              nwTag: n.tag || "ข่าวสาร",
              nwTitle: n.title || "",
              nwBody: n.body || "",
              nwSendMode: n.sendMode === "scheduled" ? "scheduled" : "now",
              nwSchedDate: n.schedDate || this.defaultSchedDate(),
              nwSchedTime: n.schedTime || "09:00",
              nwStatus: n.status === "draft" ? "draft" : "published",
            });
          },
          del: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            const idx = st.news.findIndex((x) => x.id === n.id);
            const next = st.news.filter((x) => x.id !== n.id);
            this.saveStore("cx-bo-news", next);
            const patch = {
              news: next,
              nwUndo: n,
              nwUndoIdx: idx < 0 ? 0 : idx,
              tutUndo: null,
              cpUndo: null,
              stUndo: null,
            };
            if (st.nwEditId === n.id) {
              const fb = next[0] || null;
              Object.assign(
                patch,
                fb
                  ? {
                      nwEditId: fb.id,
                      nwTag: fb.tag || "ข่าวสาร",
                      nwTitle: fb.title || "",
                      nwBody: fb.body || "",
                      nwSendMode:
                        fb.sendMode === "scheduled" ? "scheduled" : "now",
                      nwSchedDate: fb.schedDate || this.defaultSchedDate(),
                      nwSchedTime: fb.schedTime || "09:00",
                      nwStatus: fb.status === "draft" ? "draft" : "published",
                    }
                  : { nwEditId: "", nwTitle: "", nwBody: "" },
              );
            }
            this.setState(patch);
            fireToast("ลบการแจ้งเตือนแล้ว", true);
          },
        };
      });
      const monOnline = st.monitors.filter((m) => m.status === "online").length;
      const monChg = st.monitors.filter((m) => m.status === "charging").length;
      const monMaint = st.monitors.filter((m) => m.status === "maint").length;
      const monKpis = [
        {
          label: "ตู้ชาร์จทั้งหมด",
          val: String(st.monitors.length),
          fg: "#1F1F1F",
        },
        { label: "กำลังชาร์จ", val: String(monChg), fg: "#C42D00" },
        { label: "สถานีออนไลน์", val: String(monOnline), fg: "#146C3E" },
        { label: "บำรุงรักษา/ออฟไลน์", val: String(monMaint), fg: "#B86A00" },
      ];
      const monCards = st.monitors.map((m) => {
        const maint = m.status === "maint";
        const chg = m.status === "charging";
        return {
          station: m.station,
          bay: m.bay,
          power: m.power,
          load: m.load,
          car: m.car,
          statText: maint ? "บำรุงรักษา" : chg ? "กำลังชาร์จ" : "ออนไลน์",
          statStyle:
            "padding: 3px 9px; border-radius: 999px; font-size: 13px; font-weight: 700; " +
            (maint
              ? "background: #FFF4E0; color: #B86A00"
              : chg
                ? "background: #FFF1EB; color: #C42D00"
                : "background: #E7F6EE; color: #146C3E"),
          toggleLabel: maint ? "เปิดบริการ" : "ตั้งบำรุงรักษา",
          toggle: () => {
            const next = st.monitors.map((x) =>
              x.id === m.id
                ? Object.assign({}, x, {
                    status: maint ? "online" : "maint",
                    load: maint ? "ว่าง 2 จาก 2 หัว" : "บำรุงรักษาตามรอบ",
                    car: maint ? "พร้อมให้บริการ" : "ปิดใช้งานชั่วคราว",
                  })
                : x,
            );
            this.saveStore("cx-bo-monitors", next);
            this.setState({ monitors: next });
            fireToast("สลับสถานะตู้ชาร์จแล้ว");
          },
        };
      });
      const setVal = (k) => (e) =>
        this.setState({
          [k]: e && e.target ? e.target.value : "",
          lErr: "",
          modalErr: "",
        });
      const tutReplayOn = st.tutReplayEnabled !== false;
      const tutKpis = [
        {
          label: "จำนวนหน้าทั้งหมด",
          val: String(st.tutorials.length) + " หน้า",
          fg: "#1F1F1F",
        },
        { label: "โหมดการแสดงผล", val: "สไลด์โชว์ (Slideshow)", fg: "#C42D00" },
        {
          label: "การแสดงซ้ำในแอป",
          val: tutReplayOn ? "เปิดผ่านเมนูตั้งค่า" : "ปิดชั่วคราว",
          fg: tutReplayOn ? "#146C3E" : "#6B6B6B",
        },
      ];
      const moveTut = (from, to) => {
        if (!isSuper || to < 0 || to >= st.tutorials.length) return;
        const next = st.tutorials.slice();
        const moved = next.splice(from, 1)[0];
        next.splice(to, 0, moved);
        this.saveStore("cx-tutorial-slides", next);
        let nextSlide = st.tutSlide || 0;
        if (nextSlide === from) nextSlide = to;
        else if (from < to && nextSlide > from && nextSlide <= to) nextSlide--;
        else if (from > to && nextSlide >= to && nextSlide < from) nextSlide++;
        this.setState({ tutorials: next, tutSlide: nextSlide });
        fireToast("บันทึกลำดับหน้าสอนใช้งานแล้ว");
      };
      const tutCards = st.tutorials.map((tc, i) => {
        const isDrag = st.tutDragIdx === i;
        const isOver =
          st.tutDragIdx >= 0 && st.tutDragOverIdx === i && st.tutDragIdx !== i;
        const isEd = st.modal === "tut" && st.tutEditId === tc.id;
        const isFocused = (st.tutSlide || 0) === i;
        const isGuideThumb =
          !tc.img || String(tc.img).trim().indexOf("data:image/svg+xml") === 0;
        return {
          pageLabel: "หน้าที่ " + (i + 1),
          img: tc.img || this.tutImg("map"),
          isGuideThumb,
          isCustomThumb: !isGuideThumb,
          thumbTitle: "ตัวอย่างขนาดย่อ หน้าที่ " + (i + 1),
          thumbSrc:
            (d ? "./GuideDark.dc.html" : "./Guide.dc.html") +
            "?preview=1&role=thumb&step=" +
            i,
          thumbFrameRef: (el) => {
            this._tutFrames = this._tutFrames || {};
            this._tutFrames.thumbs = this._tutFrames.thumbs || [];
            const prev = this._tutFrames.thumbs[i];
            this._tutFrames.thumbs[i] = el;
            if (el && el !== prev) this.syncTutFrames();
          },
          title: tc.title || "",
          desc: tc.desc || "",
          rowStyle:
            "border-radius: 16px; padding: 11px 14px; display: flex; align-items: center; justify-content: space-between; gap: 14px; transition: border-color .15s, background .15s; " +
            (isOver
              ? "border: 1.5px dashed " + accent + "; background: #FFF7F3"
              : isDrag || isEd || isFocused
                ? "border: 1.5px solid " +
                  accent +
                  "; background: #FFF7F3" +
                  (isDrag ? "; opacity: 0.72" : "")
                : "border: 1px solid #E6E6E6; background: #FFFFFF"),
          focus: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            clearInterval(this._tutT);
            this.setState({ tutSlide: i, tutAutoPlay: false });
          },
          dragStart: (e) => {
            if (!isSuper) return;
            if (e && e.dataTransfer) {
              try {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", String(i));
              } catch (er) {}
            }
            this.setState({ tutDragIdx: i, tutDragOverIdx: i });
          },
          dragOver: (e) => {
            if (e && e.preventDefault) e.preventDefault();
            if (st.tutDragOverIdx !== i) this.setState({ tutDragOverIdx: i });
          },
          drop: (e) => {
            if (e && e.preventDefault) e.preventDefault();
            const from =
              st.tutDragIdx >= 0
                ? st.tutDragIdx
                : e && e.dataTransfer
                  ? parseInt(e.dataTransfer.getData("text/plain"), 10)
                  : -1;
            this.setState({ tutDragIdx: -1, tutDragOverIdx: -1 });
            if (!isNaN(from) && from >= 0 && from !== i) moveTut(from, i);
          },
          dragEnd: () => this.setState({ tutDragIdx: -1, tutDragOverIdx: -1 }),
          up: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            moveTut(i, i - 1);
          },
          down: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            moveTut(i, i + 1);
          },
          preview: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (!isSuper) return;
            clearInterval(this._tutT);
            this.setState({
              modal: "tut_preview",
              modalErr: "",
              tutSlide: i,
              tutAutoPlay: false,
            });
          },
          edit: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (!isSuper) return;
            clearInterval(this._tutT);
            this.setState({
              modal: "tut",
              modalErr: "",
              tutSlide: i,
              tutEditId: tc.id,
              tutSpot: tc.spot || "promo",
              tutTitle: tc.title || "",
              tutDesc: tc.desc || "",
              tutImg: tc.img || this.tutImg("promo"),
              tutAutoPlay: false,
            });
          },
          del: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (!isSuper) return;
            const next = st.tutorials.filter((x) => x.id !== tc.id);
            this.saveStore("cx-tutorial-slides", next);
            const maxIdx = Math.max(0, next.length - 1);
            this.setState({
              tutorials: next,
              tutSlide: Math.min(st.tutSlide || 0, maxIdx),
              tutUndo: tc,
              tutUndoIdx: i,
              nwUndo: null,
              cpUndo: null,
              stUndo: null,
            });
            fireToast("ลบหน้าสอนใช้งานแล้ว", true);
          },
        };
      });
      const tutImgPresets = [
        ["ไฮไลต์โปรโมชัน", this.tutImg("promo"), "promo"],
        ["ไฮไลต์ค้นหาสถานี / สแกน", this.tutImg("actions"), "actions"],
        ["ไฮไลต์ปุ่มการชาร์จ", this.tutImg("charge"), "charge"],
        ["ไฮไลต์แจ้งเตือน & โหมดมืด", this.tutImg("topbar"), "topbar"],
        [
          "ภาพสถานีจริง",
          "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
          "wallet",
        ],
      ].map(([label, src, spot]) => {
        const on = String(st.tutImg || "").trim() === src;
        return {
          label,
          pick: () =>
            this.setState({ tutImg: src, tutSpot: spot, modalErr: "" }),
          style:
            "height: 30px; padding: 0 10px; border-radius: 8px; font-family: inherit; font-size: 13.5px; font-weight: " +
            (on ? 700 : 600) +
            "; cursor: pointer; " +
            (on
              ? "border: 0; background: " + accent + "; color: #FFFFFF"
              : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
        };
      });
      const tutTotal = st.tutorials.length;
      const tutIdx = tutTotal
        ? Math.max(0, Math.min(tutTotal - 1, st.tutSlide || 0))
        : 0;
      const curTut = st.tutorials[tutIdx] || {
        title: "",
        desc: "",
        img: this.tutImg("map"),
      };
      const tutDots = st.tutorials.map((_, i) => ({
        aria: "สไลด์ที่ " + (i + 1),
        go: () => {
          clearInterval(this._tutT);
          this.setState({ tutAutoPlay: false, tutSlide: i });
        },
        style:
          "width: " +
          (i === tutIdx ? "22px" : "8px") +
          "; height: 8px; padding: 0; border: 0; border-radius: 999px; cursor: pointer; background: " +
          (i === tutIdx ? accent : "#D4D4D4"),
      }));
      const tutEditRawIdx = st.tutEditId
        ? st.tutorials.findIndex((x) => x.id === st.tutEditId)
        : -1;
      const tutPreviewPos = tutEditRawIdx >= 0 ? tutEditRawIdx : tutTotal;
      const tutPreviewTot =
        tutEditRawIdx >= 0 ? Math.max(1, tutTotal) : Math.max(1, tutTotal + 1);
      const tutPreviewDots = Array.from({ length: tutPreviewTot }, (_, i) => ({
        style:
          "width: " +
          (i === tutPreviewPos ? "18px" : "6px") +
          "; height: 6px; border-radius: 999px; background: " +
          (i === tutPreviewPos ? accent : "#D4D4D4"),
      }));
      const permPolicy = Object.assign(
        this.seedPermPolicy(),
        st.permPolicy || {},
      );
      const categoriesList = Array.isArray(st.categories)
        ? st.categories
        : this.seedCategories();
      const uniqPush = (arr, v) => {
        if (v && arr.indexOf(v) < 0) arr.push(v);
      };
      const inactiveCpCats = categoriesList
        .filter((c) => c.group === "coupon" && c.status !== "active")
        .map((c) => c.name);
      const cpUsageOpts = [];
      [
        "สินค้าและบริการ",
        "Membership",
        "เติมเงิน Wallet",
        "ทั้งหมด (สินค้า & Membership)",
      ].forEach((u) => {
        if (inactiveCpCats.indexOf(u) < 0) uniqPush(cpUsageOpts, u);
      });
      categoriesList
        .filter((c) => c.group === "coupon" && c.status === "active")
        .forEach((c) => uniqPush(cpUsageOpts, c.name));
      const inactiveNwCats = categoriesList
        .filter((c) => c.group === "news" && c.status !== "active")
        .map((c) => c.name);
      const nwTagOpts = [];
      ["ข่าวสาร", "โปรโมชัน", "ประกาศ", "สถานีใหม่"].forEach((t) => {
        if (inactiveNwCats.indexOf(t) < 0) uniqPush(nwTagOpts, t);
      });
      categoriesList
        .filter((c) => c.group === "news" && c.status === "active")
        .forEach((c) => uniqPush(nwTagOpts, c.name));
      const undoDel = () => {
        if (st.catUndo) {
          if (!canView("settings")) return;
          const arr = categoriesList.slice();
          const idx = Math.max(0, Math.min(arr.length, st.catUndoIdx || 0));
          arr.splice(idx, 0, st.catUndo);
          this.saveStore("cx-bo-categories", arr);
          this.setState({ categories: arr, catUndo: null });
          fireToast("กู้คืนหมวดหมู่แล้ว");
          return;
        }
        if (st.umUndo) {
          if (!canView("operators")) return;
          if (st.umUndoKind === "member") {
            const arr = (
              st.members && st.members.length ? st.members : this.seedMembers()
            ).slice();
            const idx = Math.max(0, Math.min(arr.length, st.umUndoIdx || 0));
            arr.splice(idx, 0, st.umUndo);
            this.saveStore("cx-bo-members", arr);
            this.setState({ members: arr, umUndo: null });
          } else {
            const arr = st.users.slice();
            const idx = Math.max(0, Math.min(arr.length, st.umUndoIdx || 0));
            arr.splice(idx, 0, st.umUndo);
            this.saveStore("cx-bo-users", arr);
            this.setState({ users: arr, umUndo: null });
          }
          fireToast("กู้คืนบัญชีผู้ใช้งานแล้ว");
          return;
        }
        if (st.stUndo) {
          if (!isSuper) return;
          const arr = (st.stations || []).slice();
          const idx = Math.max(0, Math.min(arr.length, st.stUndoIdx || 0));
          arr.splice(idx, 0, st.stUndo);
          this.saveStore("cx-bo-stations", arr);
          this.setState({ stations: arr, stUndo: null });
          fireToast("กู้คืนสถานีชาร์จแล้ว");
          return;
        }
        if (st.cpUndo) {
          const arr = st.coupons.slice();
          const idx = Math.max(0, Math.min(arr.length, st.cpUndoIdx || 0));
          arr.splice(idx, 0, st.cpUndo);
          this.saveStore("cx-wallet-coupons", arr);
          this.setState({ coupons: arr, cpUndo: null });
          fireToast("กู้คืนคูปองแล้ว");
          return;
        }
        if (st.tutUndo) {
          if (!isSuper) return;
          const arr = st.tutorials.slice();
          const idx = Math.max(0, Math.min(arr.length, st.tutUndoIdx || 0));
          arr.splice(idx, 0, st.tutUndo);
          this.saveStore("cx-tutorial-slides", arr);
          this.setState({ tutorials: arr, tutUndo: null });
          fireToast("กู้คืนหน้าสอนใช้งานแล้ว");
          return;
        }
        if (!st.nwUndo) return;
        const arr = st.news.slice();
        const idx = Math.max(0, Math.min(arr.length, st.nwUndoIdx || 0));
        arr.splice(idx, 0, st.nwUndo);
        this.saveStore("cx-bo-news", arr);
        this.setState({ news: arr, nwUndo: null });
        fireToast("กู้คืนการแจ้งเตือนแล้ว");
      };
      const txx = this._cxTx || ((s) => s);
      const dispName = curUser ? (en ? txx(curUser.name) : curUser.name) : "";
      const dash = this.computeDash(st, accent);
      const rep = this.computeReport(st, dash, accent);
      const dBtnStyle = (on) =>
        "height: 36px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 14px; font-weight: " +
        (on ? 700 : 600) +
        "; cursor: pointer; " +
        (on
          ? "border: 0; background: " + accent + "; color: #FFFFFF"
          : "border: 1px solid #E0E0E0; background: #F6F6F6; color: #3A3A3A");
      const fmtPerms = (perms, sup) => {
        if (sup || (Array.isArray(perms) && perms.length >= permDefs.length))
          return "ครบทุกโมดูล";
        const arr =
          Array.isArray(perms) && perms.length
            ? perms
            : ["coupons", "news", "monitor"];
        return arr.map((k) => permLabelMap[k] || k).join(" · ");
      };
      const curRank = isSuper ? 2 : 1;
      const openUmRowMenu = (e, uId) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (st.umMenuId === uId) {
          this.setState({ umMenuId: "" });
          return;
        }
        let top = 260,
          right = 44;
        if (
          e &&
          e.currentTarget &&
          e.currentTarget.getBoundingClientRect &&
          typeof window !== "undefined"
        ) {
          const r = e.currentTarget.getBoundingClientRect();
          top = Math.round(Math.min(window.innerHeight - 210, r.bottom + 6));
          right = Math.round(Math.max(16, window.innerWidth - r.right));
        }
        this.setState({
          umMenuId: uId,
          umMenuTop: top,
          umMenuRight: right,
          umDrop: "",
        });
      };
      const swWrap = (act, locked) =>
        "width: 40px; height: 22px; padding: 2px; box-sizing: border-box; border-radius: 999px; border: 0; background: " +
        (act ? "#146C3E" : "#D4D4D8") +
        "; display: inline-flex; align-items: center; flex: none; cursor: " +
        (locked ? "not-allowed" : "pointer") +
        "; opacity: " +
        (locked ? "0.62" : "1");
      const swKnob = (act) =>
        "width: 18px; height: 18px; border-radius: 50%; background: #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.22); transform: translateX(" +
        (act ? "18px" : "0px") +
        ")";
      const deleteUmById = (id, kind) => {
        if (!canView("operators")) return;
        if (kind === "member") {
          const raw =
            st.members && st.members.length ? st.members : this.seedMembers();
          const idx = raw.findIndex((x) => x.id === id);
          const removed = raw[idx];
          if (!removed) return;
          const next = raw.filter((x) => x.id !== id);
          this.saveStore("cx-bo-members", next);
          this.setState({
            members: next,
            modal: "",
            umDelId: "",
            umDelConfirm: "",
            umMenuId: "",
            umUndo: removed,
            umUndoKind: "member",
            umUndoIdx: idx < 0 ? 0 : idx,
            nwUndo: null,
            tutUndo: null,
            cpUndo: null,
            stUndo: null,
          });
          fireToast("ลบบัญชีผู้ใช้งานออกจากระบบแล้ว", true);
          return;
        }
        const idx = st.users.findIndex((x) => x.id === id);
        const removed = st.users[idx];
        if (!removed) return;
        if (removed.role === "super_admin") {
          fireToast("ไม่สามารถลบหรือระงับบัญชี Super Admin หลักได้");
          return;
        }
        if (removed.id === st.curId) {
          fireToast("ไม่สามารถลบบัญชีที่กำลังเข้าสู่ระบบอยู่ได้");
          return;
        }
        const next = st.users.filter((x) => x.id !== id);
        this.saveStore("cx-bo-users", next);
        this.setState({
          users: next,
          modal: "",
          umDelId: "",
          umDelConfirm: "",
          umMenuId: "",
          umUndo: removed,
          umUndoKind: "admin",
          umUndoIdx: idx < 0 ? 0 : idx,
          nwUndo: null,
          tutUndo: null,
          cpUndo: null,
          stUndo: null,
        });
        fireToast("ลบบัญชีผู้ใช้งานออกจากระบบแล้ว", true);
      };
      const adminUmPool = normUsers.map((u) => {
        const sup = u.role === "super_admin";
        const act = u.status === "active";
        const rank = sup ? 2 : 1;
        const isLockedSwitch = sup || rank > curRank || !canView("operators");
        const canMod = !sup && canView("operators");
        const isSelf = !!(curUser && u.id === curUser.id);
        const openDetail = () =>
          this.setState({
            modal: "um_detail",
            umDetId: u.id,
            umDetKind: "admin",
            umMenuId: "",
            modalErr: "",
          });
        const openEdit = () => {
          if (!canMod) return;
          this.setState({
            modal: "um_user",
            modalErr: "",
            umEditId: u.id,
            umEditKind: "admin",
            umFormType: "admin",
            umMenuId: "",
            umName: u.name || "",
            umEmail: u.email || "",
            umPhone: u.phone || "",
            umDept: u.dept || "",
            umRoleId: u.roleId || "role_op",
            umTeam: u.team || "Operations & Marketing",
            umPerms: (u.perms || ["coupons", "news", "monitor"]).slice(),
            umStatus: act ? "active" : "inactive",
            umPw: "",
            umPw2: "",
          });
        };
        const openResetPw = () => {
          if (!canMod) return;
          this.setState({
            modal: "um_pw",
            modalErr: "",
            umPwTargetId: u.id,
            umPwTargetKind: "admin",
            umNewPw: "",
            umNewPw2: "",
            umMenuId: "",
          });
        };
        const openAssignTeam = () => {
          if (!canMod) return;
          this.setState({
            modal: "um_assign_team",
            umAssignTeamId: u.id,
            umAssignTeamKind: "admin",
            umAssignTeamVal: u.team || "Operations & Marketing",
            umMenuId: "",
            modalErr: "",
          });
        };
        const doToggle = () => {
          if (sup) {
            fireToast("ไม่สามารถลบหรือระงับบัญชี Super Admin หลักได้");
            return;
          }
          if (rank > curRank) {
            fireToast("ไม่สามารถปรับสถานะบัญชีที่มีสิทธิ์สูงกว่าได้");
            return;
          }
          if (!canView("operators")) return;
          const ns = act ? "inactive" : "active";
          const next = st.users.map((x) =>
            x.id === u.id ? Object.assign({}, x, { status: ns }) : x,
          );
          this.saveStore("cx-bo-users", next);
          this.setState({ users: next });
          fireToast(
            ns === "active"
              ? "อัปเดตสถานะผู้ใช้งานเป็น Active แล้ว"
              : "อัปเดตสถานะผู้ใช้งานเป็น Inactive แล้ว",
          );
        };
        const askDel = () => {
          if (sup) {
            fireToast("ไม่สามารถลบหรือระงับบัญชี Super Admin หลักได้");
            return;
          }
          if (isSelf) {
            fireToast("ไม่สามารถลบบัญชีที่กำลังเข้าสู่ระบบอยู่ได้");
            return;
          }
          if (!canView("operators")) return;
          this.setState({
            modal: "um_del",
            umDelId: u.id,
            umDelKind: "admin",
            umDelConfirm: "",
            umMenuId: "",
            modalErr: "",
          });
        };
        const doDel = () => deleteUmById(u.id, "admin");
        return {
          id: u.id,
          uid: u.id,
          kind: "admin",
          userType: "admin",
          name: u.name,
          dept: u.dept || "Back Office",
          team: u.team || "Core Platform Team",
          uidText: u.id + (sup ? " · Root ID" : ""),
          uidTeamText:
            "User ID: " + u.id + " · " + (u.team || "Operations & Marketing"),
          idText: sup ? u.username + " · " + u.email : u.email,
          email: u.email,
          phoneText: u.phone || "081-200-0000",
          emailNote: sup
            ? "เข้าด้วย Username / อีเมลบริษัท"
            : "บังคับใช้อีเมล @chargex.co.th",
          typeLabel: "ผู้ดูแลระบบ",
          typeStyle:
            "padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 700; " +
            (sup
              ? "background: #FFF1EB; color: #C42D00"
              : "background: #FFF4E0; color: #B86A00"),
          roleKey: u.roleId,
          roleText: u.roleName || (sup ? "Super Admin" : "Operator"),
          roleStyle:
            "padding: 3px 9px; border-radius: 999px; font-size: 12.5px; font-weight: 700; " +
            (sup
              ? "background: #FFF1EB; color: #C42D00"
              : "background: #F4F4F4; color: #3A3A3A"),
          permSummary: fmtPerms(u.perms, sup),
          scopeText: fmtPerms(u.perms, sup),
          statusKey: act ? "active" : "inactive",
          isActive: act,
          statText: act ? "Active (ใช้งาน)" : "Inactive (ระงับ)",
          statShort: act ? "Active" : "Inactive",
          statStyle:
            "font-size: 12.5px; font-weight: 700; " +
            (act ? "color: #146C3E" : "color: #B42318"),
          isLockedSwitch,
          switchWrapStyle: swWrap(act, isLockedSwitch),
          switchKnobStyle: swKnob(act),
          switchAria: "สลับสถานะบัญชี " + u.name,
          extraLabel: u.dept || "Back Office",
          lastLogin: u.lastLogin || "ยังไม่เคยเข้าใช้",
          canEdit: canMod,
          isOwner: sup,
          isSelf,
          canShowDel: !sup && !isSelf && canView("operators"),
          toggleLabel: act ? "ตั้ง Inactive" : "ตั้ง Active",
          primaryLabel: canMod ? "ดู / แก้ไข" : "ดูข้อมูล",
          primaryAct: canMod ? openEdit : openDetail,
          openMenu: (e) => openUmRowMenu(e, u.id),
          openAssignTeam,
          askDel,
          view: openDetail,
          edit: openEdit,
          editPw: openResetPw,
          toggle: doToggle,
          del: doDel,
        };
      });
      const memberUmPool = dash.members.map((m) => {
        const act = m.status !== "inactive" && m.walletStatus !== "suspended";
        const ur = m.userRole || "ผู้ใช้ทั่วไป";
        const tm = m.team || "EV Driver & Fleet Group";
        const openDetail = () =>
          this.setState({
            modal: "um_detail",
            umDetId: m.id,
            umDetKind: "member",
            umMenuId: "",
            modalErr: "",
          });
        const openEdit = () => {
          if (!canView("operators")) return;
          this.setState({
            modal: "um_user",
            modalErr: "",
            umEditId: m.id,
            umEditKind: "member",
            umFormType: "member",
            umMenuId: "",
            umName: m.name || "",
            umEmail: m.email || "",
            umPhone: m.phone || "",
            umDept: m.car || "EV Car",
            umRoleId: ur,
            umTeam: tm,
            umPerms: [],
            umStatus: act ? "active" : "inactive",
            umPw: "",
            umPw2: "",
          });
        };
        const openResetPw = () => {
          if (!canView("operators")) return;
          this.setState({
            modal: "um_pw",
            modalErr: "",
            umPwTargetId: m.id,
            umPwTargetKind: "member",
            umNewPw: "",
            umNewPw2: "",
            umMenuId: "",
          });
        };
        const openAssignTeam = () => {
          if (!canView("operators")) return;
          this.setState({
            modal: "um_assign_team",
            umAssignTeamId: m.id,
            umAssignTeamKind: "member",
            umAssignTeamVal: tm,
            umMenuId: "",
            modalErr: "",
          });
        };
        const doToggle = () => {
          if (!canView("operators")) return;
          const ns = act ? "inactive" : "active";
          const raw =
            st.members && st.members.length ? st.members : this.seedMembers();
          const next = raw.map((x) =>
            x.id === m.id
              ? Object.assign({}, x, {
                  status: ns,
                  walletStatus: ns === "active" ? "active" : "suspended",
                })
              : x,
          );
          this.saveStore("cx-bo-members", next);
          this.setState({ members: next });
          fireToast(
            ns === "active"
              ? "อัปเดตสถานะผู้ใช้งานเป็น Active แล้ว"
              : "อัปเดตสถานะผู้ใช้งานเป็น Inactive แล้ว",
          );
        };
        const askDel = () => {
          if (!canView("operators")) return;
          this.setState({
            modal: "um_del",
            umDelId: m.id,
            umDelKind: "member",
            umDelConfirm: "",
            umMenuId: "",
            modalErr: "",
          });
        };
        const doDel = () => deleteUmById(m.id, "member");
        return {
          id: m.id,
          uid: m.id,
          kind: "member",
          userType: "member",
          name: m.name,
          dept: m.car || "EV Car",
          team: tm,
          uidText: m.id,
          uidTeamText: "User ID: " + m.id + " · " + tm,
          idText: m.email,
          email: m.email,
          phoneText: m.phone || "-",
          emailNote: "สมาชิกแอป Charge X",
          typeLabel: "สมาชิกแอป EV",
          typeStyle:
            "padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 700; background: #E7F6EE; color: #146C3E",
          roleKey: ur,
          roleText: ur,
          roleStyle:
            "padding: 3px 9px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #F4F4F4; color: #3A3A3A",
          permSummary: "แอป EV · กระเป๋าเงิน",
          statusKey: act ? "active" : "inactive",
          isActive: act,
          statText: act ? "Active (ใช้งาน)" : "Inactive (ระงับ)",
          statShort: act ? "Active" : "Inactive",
          statStyle:
            "font-size: 12.5px; font-weight: 700; " +
            (act ? "color: #146C3E" : "color: #B42318"),
          isLockedSwitch: !canView("operators"),
          switchWrapStyle: swWrap(act, !canView("operators")),
          switchKnobStyle: swKnob(act),
          switchAria: "สลับสถานะบัญชี " + m.name,
          extraLabel: (m.car || "-") + " · Wallet ฿" + this.fmtNum(m.wallet, 2),
          lastLogin: m.joinedLabel || "-",
          canEdit: canView("operators"),
          isOwner: false,
          isSelf: false,
          canShowDel: canView("operators"),
          toggleLabel: act ? "ตั้ง Inactive" : "ตั้ง Active",
          primaryLabel: canView("operators") ? "ดู / แก้ไข" : "ดูข้อมูล",
          primaryAct: canView("operators") ? openEdit : openDetail,
          openMenu: (e) => openUmRowMenu(e, m.id),
          openAssignTeam,
          askDel,
          view: openDetail,
          edit: openEdit,
          editPw: openResetPw,
          toggle: doToggle,
          del: doDel,
        };
      });
      const allUmPool = adminUmPool.concat(memberUmPool);
      const umQ = String(st.umSearch || "")
        .trim()
        .toLowerCase();
      const umRows = allUmPool.filter((u) => {
        if (
          (st.umTypeFilter || "all") !== "all" &&
          u.userType !== st.umTypeFilter
        )
          return false;
        if (
          (st.umRoleFilter || "all") !== "all" &&
          u.roleKey !== st.umRoleFilter &&
          u.roleText !== st.umRoleFilter
        )
          return false;
        if (
          (st.umStatFilter || "all") !== "all" &&
          u.statusKey !== st.umStatFilter
        )
          return false;
        if ((st.umTeamFilter || "all") !== "all" && u.team !== st.umTeamFilter)
          return false;
        if (
          umQ &&
          ![
            u.name,
            u.idText,
            u.email,
            u.phoneText,
            u.team,
            u.roleText,
            u.uidText,
          ].some((v) =>
            String(v || "")
              .toLowerCase()
              .includes(umQ),
          )
        )
          return false;
        return true;
      });
      const userRows = adminUmPool;
      const umActiveCnt = allUmPool.filter(
        (u) => u.statusKey === "active",
      ).length;
      const umInactiveCnt = allUmPool.length - umActiveCnt;
      const supOwner =
        normUsers.find((u) => u.role === "super_admin") || normUsers[0];
      const opCount = normUsers.filter((u) => u.role === "operator").length;
      const opKpis = [
        {
          label: "ผู้ใช้งานทั้งหมดในระบบ",
          val: allUmPool.length + " บัญชี",
          sub: "Active " + umActiveCnt + " · Inactive " + umInactiveCnt,
          fg: "#1F1F1F",
          isAll: true,
          isSup: false,
          isOp: false,
          isStruct: false,
          cardStyle:
            "height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 15px 17px; display: flex; flex-direction: column; gap: 5px",
        },
        {
          label: "โควตา Super Admin",
          val:
            String(normUsers.filter((u) => u.role === "super_admin").length) +
            " / 1 User ID",
          sub: supOwner
            ? supOwner.name + " · ID: " + supOwner.id
            : "วรพล ศิริวัฒน์ · ID: u1",
          fg: "#C42D00",
          isAll: false,
          isSup: true,
          isOp: false,
          isStruct: false,
          cardStyle:
            "height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1.5px solid #FC3901; border-radius: 16px; padding: 15px 17px; display: flex; flex-direction: column; gap: 5px",
        },
        {
          label: "Operator & ผู้ปฏิบัติการ",
          val: opCount + " บัญชี",
          sub: "จำกัดสิทธิ์เฉพาะโมดูลที่ได้รับมอบหมาย",
          fg: "#146C3E",
          isAll: false,
          isSup: false,
          isOp: true,
          isStruct: false,
          cardStyle:
            "height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 15px 17px; display: flex; flex-direction: column; gap: 5px",
        },
        {
          label: "โครงสร้างสิทธิ์และกลุ่มทีม",
          val:
            String(rolesList.length) +
            " บทบาท · " +
            String(teamsList.length) +
            " ทีม",
          sub: "กำหนดสิทธิ์ 4 ระดับรายโมดูล (RBAC)",
          fg: "#1F1F1F",
          isAll: false,
          isSup: false,
          isOp: false,
          isStruct: true,
          cardStyle:
            "height: 100%; box-sizing: border-box; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; padding: 15px 17px; display: flex; flex-direction: column; gap: 5px",
        },
      ];
      const makeUmDropOpts = (key, curVal, opts) =>
        opts.map((x) => {
          const on = (curVal || "all") === x.id;
          return {
            id: x.id,
            label: x.label,
            on,
            pick: () => this.setState({ [key]: x.id, umDrop: "" }),
            dotStyle:
              "width: 16px; height: 16px; flex: none; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; font-size: 10.5px; font-weight: 800; " +
              (on
                ? "background: " + accent + "; color: #FFFFFF"
                : "border: 1.5px solid #D4D4D4; background: #FFFFFF; color: transparent"),
            rowStyle:
              "width: 100%; height: 34px; padding: 0 10px; border: 0; border-radius: 9px; background: " +
              (on ? "#FFF7F3" : "transparent") +
              "; font-family: inherit; font-size: 13px; font-weight: " +
              (on ? 700 : 600) +
              "; color: #1F1F1F; display: flex; align-items: center; gap: 8px; cursor: pointer; text-align: left",
            style: dBtnStyle(on),
          };
        });
      const umTypeFilters = makeUmDropOpts("umTypeFilter", st.umTypeFilter, [
        { id: "all", label: "ทั้งหมด" },
        { id: "admin", label: "ผู้ดูแลระบบ (Admin/Operator)" },
        { id: "member", label: "ผู้ใช้งานแอป (EV Member)" },
      ]);
      const umStatFilters = makeUmDropOpts("umStatFilter", st.umStatFilter, [
        { id: "all", label: "ทุกสถานะ" },
        { id: "active", label: "Active (ใช้งาน)" },
        { id: "inactive", label: "Inactive (ระงับ)" },
      ]);
      const umRoleFilterOpts = [{ id: "all", label: "ทุกบทบาท" }]
        .concat(rolesList.map((r) => ({ id: r.id, label: r.name })))
        .concat([
          { id: "ผู้ใช้ทั่วไป", label: "ผู้ใช้ทั่วไป" },
          { id: "สมาชิก VIP", label: "สมาชิก VIP" },
          { id: "องค์กร / Fleet", label: "องค์กร / Fleet" },
        ]);
      const umRoleFilters = makeUmDropOpts(
        "umRoleFilter",
        st.umRoleFilter,
        umRoleFilterOpts,
      );
      const umTeamFilters = makeUmDropOpts(
        "umTeamFilter",
        st.umTeamFilter,
        [{ id: "all", label: "ทุกทีม" }].concat(
          teamsList.map((t) => ({ id: t.name, label: t.name })),
        ),
      );
      const umDropBtns = [
        ["type", "ประเภทผู้ใช้งาน", st.umTypeFilter || "all", umTypeFilters],
        ["role", "บทบาท (Role)", st.umRoleFilter || "all", umRoleFilters],
        ["stat", "สถานะ", st.umStatFilter || "all", umStatFilters],
      ].map(([id, base, curV, opts]) => {
        const open = st.umDrop === id;
        const active = curV !== "all";
        const pickedLbl = (opts.find((o) => o.id === curV) || {}).label || "";
        const text = !active
          ? base + ": ทั้งหมด ▾"
          : base + ": " + pickedLbl + " ▾";
        return {
          label: text,
          style:
            "height: 34px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; cursor: pointer; white-space: nowrap; " +
            (open || active
              ? "border: 1px solid " +
                accent +
                "; background: #FFF1EB; color: #C42D00"
              : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
          toggle: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (open) {
              this.setState({ umDrop: "" });
              return;
            }
            let top = 260,
              left = 320;
            if (
              e &&
              e.currentTarget &&
              e.currentTarget.getBoundingClientRect &&
              typeof window !== "undefined"
            ) {
              const r = e.currentTarget.getBoundingClientRect();
              top = Math.round(
                Math.min(window.innerHeight - 260, r.bottom + 6),
              );
              left = Math.round(
                Math.min(window.innerWidth - 260, Math.max(16, r.left)),
              );
            }
            this.setState({
              umDrop: id,
              umDropTop: top,
              umDropLeft: left,
              umMenuId: "",
            });
          },
        };
      });
      const umSec =
        ["users", "roles", "teams"].indexOf(st.umSection) >= 0
          ? st.umSection
          : "users";
      const umSectionBtns = [
        ["users", "รายชื่อผู้ใช้งานทั้งหมด", String(allUmPool.length)],
        ["roles", "บทบาทและสิทธิ์ (Roles)", String(rolesList.length)],
        ["teams", "กลุ่มผู้ใช้งานระบบ (User Teams)", String(teamsList.length)],
      ].map(([id, label, badge]) => {
        const on = umSec === id;
        return {
          label,
          badge,
          hasBadge: !!badge,
          badgeStyle:
            "margin-left: 6px; padding: 2px 7px; border-radius: 999px; font-size: 11px; font-weight: 700; font-variant-numeric: tabular-nums; " +
            (on
              ? "background: #FFF1EB; color: #C42D00"
              : "background: #F4F4F4; color: #5C5C5C"),
          pick: () =>
            this.setState({ umSection: id, umDrop: "", umMenuId: "" }),
          style:
            "padding: 2px 2px 11px; border: 0; border-bottom: 2.5px solid " +
            (on ? accent : "transparent") +
            "; background: transparent; font-family: inherit; font-size: 14px; font-weight: " +
            (on ? 700 : 600) +
            "; color: " +
            (on ? "#1F1F1F" : "#6B6B6B") +
            "; display: inline-flex; align-items: center; cursor: pointer; white-space: nowrap",
        };
      });
      const LVL_DEFS = [
        ["none", "ไม่มีสิทธิ์"],
        ["view", "ดูอย่างเดียว"],
        ["edit", "เพิ่ม/แก้ไข"],
        ["full", "จัดการเต็มรูปแบบ"],
      ];
      const umRoleRows = rolesList.map((rl) => {
        const supRole = rl.baseRole === "super_admin";
        const assignedCount = normUsers.filter(
          (u) => u.roleId === rl.id,
        ).length;
        return {
          id: rl.id,
          name: rl.name,
          desc: rl.desc || "",
          baseText: supRole ? "Super Admin (1 ID เท่านั้น)" : "Operator Tier",
          baseStyle:
            "padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; " +
            (supRole
              ? "background: #FFF1EB; color: #C42D00"
              : "background: #F4F4F4; color: #3A3A3A"),
          permText: fmtPerms(rl.perms, supRole),
          countText: assignedCount + " ผู้ใช้",
          canDel: !rl.systemLocked && !supRole,
          canEditRole: !supRole,
          view: () => {
            if (!canView("operators")) return;
            this.setState({
              modal: "um_role",
              modalErr: "",
              roleEditId: rl.id,
              roleReadOnly: true,
              roleName: rl.name,
              roleDesc: rl.desc || "",
              rolePerms: (rl.perms || []).slice(),
              rolePermLevels: Object.assign(
                {},
                rl.permLevels || this.levelsFromPerms(rl.perms, supRole),
              ),
            });
          },
          edit: () => {
            if (!canView("operators")) return;
            this.setState({
              modal: "um_role",
              modalErr: "",
              roleEditId: rl.id,
              roleReadOnly: false,
              roleName: rl.name,
              roleDesc: rl.desc || "",
              rolePerms: (rl.perms || []).slice(),
              rolePermLevels: Object.assign(
                {},
                rl.permLevels || this.levelsFromPerms(rl.perms, supRole),
              ),
            });
          },
          selectMatrix: () => this.setState({ roleSelMatrixId: rl.id }),
          del: () => {
            if (!canView("operators")) return;
            if (rl.systemLocked || supRole) {
              fireToast("ไม่สามารถลบบทบาทระบบหลักได้");
              return;
            }
            if (normUsers.some((u) => u.roleId === rl.id)) {
              fireToast("ไม่สามารถลบบทบาทที่ยังมีผู้ใช้งานสังกัดอยู่ได้");
              return;
            }
            const next = rolesList.filter((x) => x.id !== rl.id);
            this.saveStore("cx-bo-roles", next);
            this.setState({
              roles: next,
              roleSelMatrixId: next[0] ? next[0].id : "role_op",
            });
            fireToast("ลบบทบาทเรียบร้อยแล้ว");
          },
        };
      });
      const matrixRoleObj =
        rolesList.find((r) => r.id === st.roleSelMatrixId) ||
        rolesList.find((r) => r.id === "role_op") ||
        rolesList[0];
      const matrixRoleIsSup = !!(
        matrixRoleObj && matrixRoleObj.baseRole === "super_admin"
      );
      const umRoleMatrixTabs = rolesList.map((r) => {
        const on = matrixRoleObj && matrixRoleObj.id === r.id;
        return {
          label: r.name,
          isLocked: r.baseRole === "super_admin",
          pick: () => this.setState({ roleSelMatrixId: r.id }),
          style:
            "height: 32px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; cursor: pointer; " +
            (on
              ? "border: 0; background: " + accent + "; color: #FFFFFF"
              : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
        };
      });
      const umMatrixRows = permDefs.map(([modId, modLabel]) => {
        const curLv = matrixRoleIsSup
          ? "full"
          : (matrixRoleObj &&
              matrixRoleObj.permLevels &&
              matrixRoleObj.permLevels[modId]) ||
            "none";
        return {
          modId,
          modLabel,
          levels: LVL_DEFS.map(([lvId, lvLabel]) => {
            const on = curLv === lvId;
            const toneBg =
              lvId === "full"
                ? "#FFF1EB"
                : lvId === "edit"
                  ? "#E7F6EE"
                  : lvId === "view"
                    ? "#F4F4F4"
                    : "#F6F6F6";
            const toneFg =
              lvId === "full"
                ? "#C42D00"
                : lvId === "edit"
                  ? "#146C3E"
                  : "#3A3A3A";
            return {
              label: lvLabel,
              disabled: matrixRoleIsSup,
              pick: () => {
                if (!canView("operators")) return;
                if (matrixRoleIsSup || !matrixRoleObj) {
                  fireToast(
                    "สิทธิ์ของ Super Admin ถูกล็อกเต็มระบบ (1 User ID)",
                  );
                  return;
                }
                const nextLvMap = Object.assign({}, matrixRoleObj.permLevels, {
                  [modId]: lvId,
                });
                const nextPerms = this.permsFromLevels(nextLvMap, false);
                if (!nextPerms.length) {
                  fireToast("บทบาทต้องมีสิทธิ์อย่างน้อย 1 โมดูล");
                  return;
                }
                const nextR = rolesList.map((r) =>
                  r.id === matrixRoleObj.id
                    ? Object.assign({}, r, {
                        permLevels: nextLvMap,
                        perms: nextPerms,
                      })
                    : r,
                );
                const nextU = st.users.map((u) =>
                  u.roleId === matrixRoleObj.id
                    ? Object.assign({}, u, { perms: nextPerms.slice() })
                    : u,
                );
                this.saveStore("cx-bo-roles", nextR);
                this.saveStore("cx-bo-users", nextU);
                this.setState({ roles: nextR, users: nextU });
                fireToast(
                  "อัปเดตสิทธิ์ " + modLabel + ' เป็น "' + lvLabel + '" แล้ว',
                );
              },
              style:
                "height: 28px; padding: 0 9px; border-radius: 8px; font-family: inherit; font-size: 12px; font-weight: " +
                (on ? 700 : 600) +
                "; cursor: " +
                (matrixRoleIsSup ? "not-allowed" : "pointer") +
                "; " +
                (on
                  ? "border: 1px solid " +
                    (lvId === "none" ? "#D4D4D4" : toneFg) +
                    "; background: " +
                    toneBg +
                    "; color: " +
                    toneFg
                  : "border: 1px solid #E6E6E6; background: #FFFFFF; color: #6B6B6B"),
            };
          }),
        };
      });
      const umTeamRows = teamsList.map((tm) => {
        const membersInTeam = allUmPool.filter((u) => u.team === tm.name);
        const cnt = membersInTeam.length;
        const previewNames =
          membersInTeam
            .slice(0, 3)
            .map((m) => m.name)
            .join(" · ") + (cnt > 3 ? " (+" + (cnt - 3) + ")" : "");
        return {
          id: tm.id,
          name: tm.name,
          desc: tm.desc || "",
          lead: tm.lead || "ยังไม่ได้ระบุหัวหน้าทีม",
          scope: tm.scope || tm.desc || "ทุกพื้นที่ที่รับผิดชอบ",
          countText: "สมาชิกในทีม " + cnt + " คน",
          memberPreview: cnt ? previewNames : "ยังไม่มีสมาชิกในทีม",
          canDel: cnt === 0,
          filterUsers: () =>
            this.setState({
              umSection: "users",
              umTeamFilter: tm.name,
              umDrop: "",
            }),
          manageMembers: () => {
            if (!canView("operators")) return;
            this.setState({
              modal: "um_team",
              modalErr: "",
              tmEditId: tm.id,
              tmModalTab: "members",
              tmName: tm.name,
              tmDesc: tm.desc || "",
              tmLead: tm.lead || "",
              tmScope: tm.scope || "",
              tmMemberIds: membersInTeam.map((m) => m.id),
            });
          },
          edit: () => {
            if (!canView("operators")) return;
            this.setState({
              modal: "um_team",
              modalErr: "",
              tmEditId: tm.id,
              tmModalTab: "info",
              tmName: tm.name,
              tmDesc: tm.desc || "",
              tmLead: tm.lead || "",
              tmScope: tm.scope || "",
              tmMemberIds: membersInTeam.map((m) => m.id),
            });
          },
          del: () => {
            if (!canView("operators")) return;
            if (cnt > 0) {
              fireToast("ไม่สามารถลบกลุ่มทีมที่มีผู้ใช้งานสังกัดอยู่ได้");
              return;
            }
            const next = teamsList.filter((x) => x.id !== tm.id);
            this.saveStore("cx-bo-teams", next);
            this.setState({ teams: next });
            fireToast("ลบกลุ่มทีมเรียบร้อยแล้ว");
          },
        };
      });
      const umIsAdminType = (st.umFormType || "admin") === "admin";
      const umFormTypeBtns = [
        ["admin", "ผู้ดูแลระบบ (Admin/Operator)"],
        ["member", "ผู้ใช้งานแอป (EV Member)"],
      ].map(([id, label]) => ({
        label,
        pick: () =>
          this.setState({
            umFormType: id,
            modalErr: "",
            umRoleId: id === "admin" ? "role_op" : "ผู้ใช้ทั่วไป",
            umTeam:
              id === "admin"
                ? "Operations & Marketing"
                : "EV Driver & Fleet Group",
            umPerms: id === "admin" ? ["coupons", "news", "monitor"] : [],
          }),
        style: dBtnStyle((st.umFormType || "admin") === id),
      }));
      const supOtherExists = st.users.some(
        (x) =>
          x.role === "super_admin" && (!st.umEditId || x.id !== st.umEditId),
      );
      const umFormRoleChoices = umIsAdminType
        ? rolesList.map((r) => [
            r.id,
            r.name,
            r.perms,
            r.baseRole === "super_admin" && supOtherExists,
          ])
        : [
            ["ผู้ใช้ทั่วไป", "ผู้ใช้ทั่วไป", [], false],
            ["สมาชิก VIP", "สมาชิก VIP", [], false],
            ["องค์กร / Fleet", "องค์กร / Fleet", [], false],
          ];
      const umFormRoleBtns = umFormRoleChoices.map(
        ([id, label, defP, lockedSup]) => {
          const on = st.umRoleId === id;
          return {
            label,
            isLocked: !!lockedSup,
            pick: () => {
              if (lockedSup) {
                this.setState({
                  umRoleId: id,
                  modalErr:
                    "ไม่สามารถกำหนดบทบาท Super Admin เพิ่มได้ เนื่องจากระบบจำกัดไว้ที่ 1 User ID เท่านั้น",
                });
                return;
              }
              this.setState({
                umRoleId: id,
                umPerms: Array.isArray(defP) ? defP.slice() : [],
                modalErr: "",
              });
            },
            style: lockedSup
              ? "height: 36px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 13.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 5px; cursor: not-allowed; " +
                (on
                  ? "border: 1.5px solid #B42318; background: #FDECEC; color: #B42318"
                  : "border: 1px dashed #D4D4D4; background: #F6F6F6; color: #6B6B6B")
              : "height: 36px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 14px; font-weight: " + (on ? 700 : 600) + "; display: inline-flex; align-items: center; gap: 5px; cursor: pointer; " + (on ? "border: 0; background: " + accent + "; color: #FFFFFF" : "border: 1px solid #E0E0E0; background: #F6F6F6; color: #3A3A3A"),
          };
        },
      );
      const pickedRoleCheck = rolesList.find((r) => r.id === st.umRoleId);
      const umSupLockAlert =
        umIsAdminType &&
        !!(
          pickedRoleCheck &&
          pickedRoleCheck.baseRole === "super_admin" &&
          supOtherExists
        );
      const umFormTeamBtns = teamsList.map((t) => ({
        label: t.name,
        pick: () => this.setState({ umTeam: t.name, modalErr: "" }),
        style: dBtnStyle(st.umTeam === t.name),
      }));
      const umCurPerms = Array.isArray(st.umPerms) ? st.umPerms : [];
      const umFormPermBtns = permDefs.map(([id, label]) => {
        const on = umCurPerms.indexOf(id) >= 0;
        return {
          label,
          pick: () =>
            this.setState({
              umPerms: on
                ? umCurPerms.filter((x) => x !== id)
                : umCurPerms.concat([id]),
              modalErr: "",
            }),
          style: dBtnStyle(on),
        };
      });
      const umFormStatBtns = [
        ["active", "Active (ใช้งาน)"],
        ["inactive", "Inactive (ระงับ)"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ umStatus: id, modalErr: "" }),
        style: dBtnStyle((st.umStatus || "active") === id),
      }));
      const roleEditObj = rolesList.find((r) => r.id === st.roleEditId) || null;
      const roleEditIsSup = !!(
        roleEditObj && roleEditObj.baseRole === "super_admin"
      );
      const rlCurPerms = Array.isArray(st.rolePerms) ? st.rolePerms : [];
      const rlCurLevels =
        st.rolePermLevels && typeof st.rolePermLevels === "object"
          ? st.rolePermLevels
          : this.levelsFromPerms(rlCurPerms, roleEditIsSup);
      const rolePermBtns = permDefs.map(([id, label]) => {
        const on = rlCurPerms.indexOf(id) >= 0;
        return {
          label,
          pick: () => {
            if (st.roleReadOnly || roleEditIsSup) return;
            const nextP = on
              ? rlCurPerms.filter((x) => x !== id)
              : rlCurPerms.concat([id]);
            const nextL = Object.assign({}, rlCurLevels, {
              [id]: on
                ? "none"
                : rlCurLevels[id] && rlCurLevels[id] !== "none"
                  ? rlCurLevels[id]
                  : "edit",
            });
            this.setState({
              rolePerms: nextP,
              rolePermLevels: nextL,
              modalErr: "",
            });
          },
          style: dBtnStyle(on),
        };
      });
      const roleModalMatrixRows = permDefs.map(([modId, modLabel]) => {
        const curLv = roleEditIsSup ? "full" : rlCurLevels[modId] || "none";
        return {
          modLabel,
          levels: LVL_DEFS.map(([lvId, lvLabel]) => {
            const on = curLv === lvId;
            return {
              label: lvLabel,
              pick: () => {
                if (st.roleReadOnly || roleEditIsSup) return;
                const nextL = Object.assign({}, rlCurLevels, { [modId]: lvId });
                const nextP = this.permsFromLevels(nextL, false);
                this.setState({
                  rolePermLevels: nextL,
                  rolePerms: nextP,
                  modalErr: "",
                });
              },
              style:
                "height: 26px; padding: 0 7px; border-radius: 7px; font-family: inherit; font-size: 11.5px; font-weight: " +
                (on ? 700 : 600) +
                "; cursor: " +
                (st.roleReadOnly || roleEditIsSup ? "not-allowed" : "pointer") +
                "; " +
                (on
                  ? "border: 0; background: " + accent + "; color: #FFFFFF"
                  : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #5C5C5C"),
            };
          }),
        };
      });
      const tmSelIds = Array.isArray(st.tmMemberIds) ? st.tmMemberIds : [];
      const tmMemberChecks = allUmPool.map((u) => {
        const on = tmSelIds.indexOf(u.id) >= 0;
        return {
          id: u.id,
          name: u.name,
          meta: u.roleText + " · ปัจจุบัน: " + u.team,
          on,
          boxStyle:
            "width: 17px; height: 17px; flex: none; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; " +
            (on
              ? "background: " +
                accent +
                "; color: #FFFFFF; border: 1px solid " +
                accent
              : "background: #FFFFFF; color: transparent; border: 1.5px solid #D4D4D4"),
          rowStyle:
            "width: 100%; padding: 8px 10px; border-radius: 10px; border: 1px solid " +
            (on ? "#FDBA94" : "#EFEFEF") +
            "; background: " +
            (on ? "#FFF7F3" : "#FFFFFF") +
            "; display: flex; align-items: center; gap: 9px; text-align: left; cursor: pointer",
          toggle: () =>
            this.setState({
              tmMemberIds: on
                ? tmSelIds.filter((x) => x !== u.id)
                : tmSelIds.concat([u.id]),
            }),
        };
      });
      const umDetObj =
        allUmPool.find((u) => u.id === st.umDetId) || allUmPool[0];
      const umPwTargetObj =
        allUmPool.find((u) => u.id === st.umPwTargetId) || allUmPool[0];
      const toRpArr = (v) => {
        if (Array.isArray(v)) return v.filter((x) => x && x !== "all");
        const s = String(v || "all").trim();
        return !s || s === "all"
          ? []
          : s
              .split(",")
              .map((x) => x.trim())
              .filter((x) => x && x !== "all");
      };
      const makeMultiRp = (key, defs) => {
        const sel = toRpArr(st[key]);
        return defs.map(([id, label]) => {
          const isAll = id === "all";
          const on = isAll ? sel.length === 0 : sel.indexOf(id) >= 0;
          const toggle = () => {
            if (isAll) {
              this.setState({ [key]: "all" });
              return;
            }
            const next = on ? sel.filter((x) => x !== id) : sel.concat([id]);
            this.setState({ [key]: next.length ? next : "all" });
          };
          return {
            id,
            label,
            on,
            pick: () => this.setState({ [key]: id, rpDrop: "" }),
            toggle,
            checkBoxStyle:
              "width: 16px; height: 16px; flex: none; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; " +
              (on
                ? "background: " +
                  accent +
                  "; color: #FFFFFF; border: 1px solid " +
                  accent
                : "background: #FFFFFF; color: transparent; border: 1.5px solid #D4D4D4"),
            rowStyle:
              "width: 100%; height: 34px; padding: 0 10px; border: 0; border-radius: 9px; background: " +
              (on ? "#FFF7F3" : "transparent") +
              "; font-family: inherit; font-size: 13px; font-weight: " +
              (on ? 700 : 600) +
              "; color: #1F1F1F; display: flex; align-items: center; gap: 8px; cursor: pointer; text-align: left",
            style: dBtnStyle(on),
          };
        });
      };
      const rpConnFilters = makeMultiRp("rpConnFilter", [
        ["all", "ทุกหัวชาร์จ"],
        ["CCS2 DC", "CCS2 DC"],
        ["AC Type 2", "AC Type 2"],
        ["CHAdeMO", "CHAdeMO"],
      ]);
      const rpSlotFilters = makeMultiRp("rpSlotFilter", [
        ["all", "ทุกรอบเวลา"],
        ["s00", "00:00–06:00 (Off-Peak)"],
        ["s06", "06:00–12:00 (ช่วงเช้า)"],
        ["s12", "12:00–18:00 (ช่วงบ่าย Peak)"],
        ["s18", "18:00–24:00 (ช่วงค่ำ Peak)"],
      ]);
      const rpStationFilters = makeMultiRp(
        "rpStationFilter",
        [["all", "ทุกสถานี"]].concat(dash.stations.map((s) => [s.id, s.name])),
      );
      const rpRoleFilters = makeMultiRp("rpRoleFilter", [
        ["all", "ทุกสิทธิ์"],
        ["super_admin", "Super Admin"],
        ["operator", "Operator"],
        ["ผู้ใช้ทั่วไป", "ผู้ใช้ทั่วไป"],
        ["สมาชิก VIP", "สมาชิก VIP"],
        ["องค์กร / Fleet", "องค์กร / Fleet"],
      ]);
      const rpSec = st.rpSection || "all";
      const rpViewBtns = [
        ["all", "ดูรวม (5 หมวด)", ""],
        ["usage", "1. ยอดใช้งานเชิงวิเคราะห์", ""],
        ["users", "2. ข้อมูลผู้ใช้งาน", String(rep.rpUserRows.length)],
        ["access", "3. การเข้าใช้งานระบบ", String(rep.rpAccessRows.length)],
        ["stations", "4. สถานีชาร์จไฟฟ้า", String(rep.rpStationRows.length)],
        ["chargers", "5. ตู้ชาร์จทั้งหมด", String(rep.rpAllChargers.length)],
      ].map(([id, label, badge]) => {
        const on = rpSec === id;
        if (id === "all") {
          return {
            label,
            badge: "",
            hasBadge: false,
            badgeStyle: "",
            pick: () => this.setState({ rpSection: id, rpDrop: "" }),
            style:
              "order: 9; margin-left: auto; margin-bottom: 6px; height: 28px; padding: 0 10px; border-radius: 8px; border: 1px solid " +
              (on ? accent : "#E0E0E0") +
              "; background: " +
              (on ? "#FFF1EB" : "#FFFFFF") +
              "; font-family: inherit; font-size: 12.5px; font-weight: 700; color: " +
              (on ? "#C42D00" : "#5C5C5C") +
              "; cursor: pointer; white-space: nowrap",
          };
        }
        return {
          label,
          badge,
          hasBadge: !!badge,
          badgeStyle:
            "margin-left: 6px; padding: 2px 7px; border-radius: 999px; font-size: 11px; font-weight: 700; font-variant-numeric: tabular-nums; " +
            (on
              ? "background: #FFF1EB; color: #C42D00"
              : "background: #F4F4F4; color: #5C5C5C"),
          pick: () => this.setState({ rpSection: id, rpDrop: "" }),
          style:
            "padding: 2px 2px 11px; border: 0; border-bottom: 2.5px solid " +
            (on ? accent : "transparent") +
            "; background: transparent; font-family: inherit; font-size: 14px; font-weight: " +
            (on ? 700 : 600) +
            "; color: " +
            (on ? "#1F1F1F" : "#6B6B6B") +
            "; display: inline-flex; align-items: center; cursor: pointer; white-space: nowrap",
        };
      });
      const cmpMetricBtns = [
        ["sessions", "การชาร์จ (ครั้ง)"],
        ["kwh", "พลังงาน (kWh)"],
        ["rev", "รายได้ (฿)"],
      ].map(([id, label]) => {
        const on = dash.metric === id;
        return {
          label,
          pick: () => this.setState({ cmpMetric: id }),
          style: dBtnStyle(on),
        };
      });
      const maxStKwh = Math.max(
        1,
        Math.max.apply(
          null,
          dash.stations.map((s) => s.kwh),
        ),
      );
      const stStatBadge = (status) =>
        status === "maint"
          ? [
              "บำรุงรักษา",
              "padding: 3px 9px; border-radius: 999px; font-size: 13px; font-weight: 700; background: #FFF4E0; color: #B86A00",
            ]
          : status === "charging"
            ? [
                "กำลังชาร์จ",
                "padding: 3px 9px; border-radius: 999px; font-size: 13px; font-weight: 700; background: #FFF1EB; color: #C42D00",
              ]
            : [
                "ออนไลน์",
                "padding: 3px 9px; border-radius: 999px; font-size: 13px; font-weight: 700; background: #E7F6EE; color: #146C3E",
              ];
      const stCompareRows = dash.stations.slice(0, 5).map((s) => {
        const pct = Math.max(10, Math.round((s.kwh / maxStKwh) * 100));
        const [stLbl] = stStatBadge(s.status);
        return {
          name: s.name,
          kwhText: this.fmtNum(s.kwh, 1) + " kWh",
          barStyle:
            "height: 100%; border-radius: 999px; background: " +
            accent +
            "; width: " +
            pct +
            "%",
          sessText: s.sessions + " ครั้ง · " + s.baysText,
          revText: "฿" + this.fmtNum(s.rev, 0) + " · " + stLbl,
        };
      });
      const stDirRows = dash.stations.map((s) => {
        const [statText, statStyle] = stStatBadge(s.status);
        return {
          name: s.name,
          area: s.area,
          power: s.power,
          bays: s.baysText,
          sessions: s.sessions + " ครั้ง",
          kwh: this.fmtNum(s.kwh, 1),
          rev: "฿" + this.fmtNum(s.rev, 2),
          statText,
          statStyle,
        };
      });
      const mFilter =
        st.memFilter === "active" || st.memFilter === "debt"
          ? st.memFilter
          : "all";
      const memAllCnt = dash.members.length;
      const memDebtCnt = dash.members.filter((m) => m.uncollected > 0).length;
      const memOkCnt = memAllCnt - memDebtCnt;
      const memSegStyle = (on) =>
        "height: 32px; padding: 0 11px; border-radius: 8px; border: 0; font-family: inherit; font-size: 13px; font-weight: " +
        (on ? 700 : 600) +
        "; cursor: pointer; white-space: nowrap; " +
        (on
          ? "background: #1F1F1F; color: #FFFFFF"
          : "background: transparent; color: #5C5C5C");
      const memFilters = [
        ["all", "ทั้งหมด (" + memAllCnt + ")"],
        ["active", "ใช้งานปกติ (" + memOkCnt + ")"],
        ["debt", "มียอดค้างตัดไม่ได้ (" + memDebtCnt + ")"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ memFilter: id, memPage: 1 }),
        style: memSegStyle(mFilter === id),
      }));
      const q = String(st.memSearch || "")
        .trim()
        .toLowerCase();
      const filteredMembers = dash.members.filter((m) => {
        if (mFilter === "debt" && !(m.uncollected > 0)) return false;
        if (mFilter === "active" && m.uncollected > 0) return false;
        if (!q) return true;
        return (
          (m.name + " " + m.email + " " + m.phone + " " + m.car)
            .toLowerCase()
            .indexOf(q) >= 0
        );
      });
      const memAvPalette = [
        ["#E7F6EE", "#146C3E"],
        ["#FFF1EB", "#C42D00"],
        ["#FFF4E0", "#B86A00"],
        ["#F4F4F4", "#3A3A3A"],
      ];
      const memInitials = (s) => {
        const parts = String(s || "M")
          .trim()
          .split(/\s+/)
          .filter(Boolean);
        const pick1 = (w) =>
          (w.replace(/^[\u0E40-\u0E44]+/, "") || w).slice(0, 1).toUpperCase();
        return parts.length >= 2
          ? pick1(parts[0]) + pick1(parts[1])
          : pick1(parts[0]);
      };
      const memberRows = filteredMembers.map((m, idx) => {
        const debt = m.uncollected > 0;
        const dispNm = en ? txx(m.name) : m.name;
        const [avBg, avFg] = debt
          ? ["#FDECEC", "#B42318"]
          : memAvPalette[idx % memAvPalette.length];
        return {
          name: m.name,
          initials: memInitials(dispNm),
          avStyle:
            "width: 34px; height: 34px; flex: none; border-radius: 50%; background: " +
            avBg +
            "; color: " +
            avFg +
            "; font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center",
          joined: "สมัคร " + m.joinedLabel,
          email: m.email,
          phone: m.phone,
          car: m.car,
          sessions: m.sessions + " ครั้ง",
          kwh: this.fmtNum(m.kwh, 1) + " kWh",
          wallet: "฿" + this.fmtNum(m.wallet, 2),
          uncollected: "฿" + this.fmtNum(m.uncollected, 2),
          uncollStyle:
            "text-align: right; font-variant-numeric: tabular-nums; font-weight: " +
            (debt ? 700 : 600) +
            "; color: " +
            (debt ? "#B42318" : "#6B6B6B"),
          statText: debt ? "ค้างตัดชำระ" : "ใช้งานปกติ",
          statStyle:
            "padding: 3px 9px; border-radius: 999px; font-size: 13px; font-weight: 700; white-space: nowrap; " +
            (debt
              ? "background: #FDECEC; color: #B42318"
              : "background: #E7F6EE; color: #146C3E"),
        };
      });
      const memPerPage = 6;
      const memTotalPages = Math.max(
        1,
        Math.ceil(memberRows.length / memPerPage),
      );
      const memCurPage = Math.max(
        1,
        Math.min(memTotalPages, Number(st.memPage || 1)),
      );
      const memStartIdx = (memCurPage - 1) * memPerPage;
      const memPageRows = memberRows.slice(
        memStartIdx,
        memStartIdx + memPerPage,
      );
      const memPageRangeText =
        memberRows.length === 0
          ? "แสดง 0 จาก " + memAllCnt + " รายการ"
          : "แสดง " +
            (memStartIdx + 1) +
            "–" +
            Math.min(memStartIdx + memPerPage, memberRows.length) +
            " จาก " +
            memberRows.length +
            " รายการ";
      const memPageBtns = Array.from(
        { length: memTotalPages },
        (_, k) => k + 1,
      ).map((p) => {
        const on = p === memCurPage;
        return {
          label: String(p),
          pick: () => this.setState({ memPage: p }),
          style:
            "min-width: 32px; height: 32px; padding: 0 8px; border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums; cursor: pointer; " +
            (on
              ? "border: 1px solid #1F1F1F; background: #1F1F1F; color: #FFFFFF"
              : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
        };
      });
      const growthPos = dash.growthSess >= 0;
      const availPct = Math.round(
        ((dash.stOnline + dash.stChg) / Math.max(1, dash.stations.length)) *
          100,
      );
      const maintPct = Math.max(0, 100 - availPct);
      const usrActPct = Math.round(
        (dash.activeMembersInPeriod / Math.max(1, dash.members.length)) * 100,
      );
      const curSumFmt =
        dash.metric === "rev"
          ? "฿" + this.fmtNum(dash.cmpCurTotal, 2)
          : dash.metric === "kwh"
            ? this.fmtNum(dash.cmpCurTotal, 1) + " kWh"
            : this.fmtNum(dash.cmpCurTotal, 0) + " ครั้ง";
      const prevSumFmt =
        dash.metric === "rev"
          ? "฿" + this.fmtNum(dash.cmpPrevTotal, 2)
          : dash.metric === "kwh"
            ? this.fmtNum(dash.cmpPrevTotal, 1) + " kWh"
            : this.fmtNum(dash.cmpPrevTotal, 0) + " ครั้ง";
      const diffSign = dash.cmpDiffAbs >= 0 ? "+" : "";
      const diffFmt =
        dash.metric === "rev"
          ? diffSign + "฿" + this.fmtNum(Math.abs(dash.cmpDiffAbs), 2)
          : dash.metric === "kwh"
            ? diffSign + this.fmtNum(dash.cmpDiffAbs, 1) + " kWh"
            : diffSign + Math.round(dash.cmpDiffAbs) + " ครั้ง";
      const payCfg = Object.assign(this.seedPayCfg(), st.payCfg || {});
      const payList = st.payments || [];
      const payStatMeta = (s) =>
        s === "paid"
          ? [
              "ชำระสำเร็จ",
              "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #E7F6EE; color: #146C3E",
            ]
          : s === "pending"
            ? [
                "รอตรวจสอบสลิป",
                "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #FFF4E0; color: #B86A00",
              ]
            : s === "failed"
              ? [
                  "ตัดเงินไม่สำเร็จ",
                  "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #FDECEC; color: #B42318",
                ]
              : [
                  "คืนเงินแล้ว",
                  "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #F4F4F4; color: #5C5C5C",
                ];
      const payPaidSum = payList
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
      const payPendCount = payList.filter(
        (p) => p.status === "pending" || p.status === "failed",
      ).length;
      const gwBatches = st.gwBatches || [];
      const gwMatchedCount = gwBatches.filter(
        (g) => g.verifyStatus === "matched",
      ).length;
      const gwMatchedSum = gwBatches
        .filter((g) => g.verifyStatus === "matched")
        .reduce((sum, g) => sum + (Number(g.net) || 0), 0);
      const membersSrc = dash.members;
      const walletSuspCount = membersSrc.filter(
        (m) => (m.walletStatus || "active") === "suspended",
      ).length;
      const paySubTabVal =
        ["gw", "wallet"].indexOf(st.paySubTab) >= 0 ? st.paySubTab : "tx";
      const paySubTabs = [
        [
          "tx",
          "รายการชำระเงิน & หลักฐาน",
          String(payList.length),
          "background: #F4F4F4; color: #3A3A3A",
        ],
        [
          "gw",
          "ตรวจสอบการโอนจาก Payment Gateway",
          "ตรงยอด " + gwMatchedCount + "/" + gwBatches.length,
          gwMatchedCount === gwBatches.length
            ? "background: #E7F6EE; color: #146C3E"
            : "background: #FFF4E0; color: #B86A00",
        ],
        [
          "wallet",
          "กระเป๋าเงินผู้ใช้ (User Role)",
          "ระงับ " + walletSuspCount,
          walletSuspCount > 0
            ? "background: #FFF4E0; color: #B86A00"
            : "background: #E7F6EE; color: #146C3E",
        ],
      ].map(([id, label, badge, badgeBg]) => {
        const on = paySubTabVal === id;
        return {
          label,
          badge,
          badgeStyle:
            "margin-left: 6px; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 700; font-variant-numeric: tabular-nums; " +
            badgeBg,
          pick: () => this.setState({ paySubTab: id, payMenuId: "" }),
          style:
            "padding: 0 2px 11px; border: 0; border-bottom: 2.5px solid " +
            (on ? accent : "transparent") +
            "; background: transparent; font-family: inherit; font-size: 14.5px; font-weight: " +
            (on ? 700 : 600) +
            "; color: " +
            (on ? "#1F1F1F" : "#6B6B6B") +
            "; display: inline-flex; align-items: center; cursor: pointer; white-space: nowrap",
        };
      });
      const payKpis = [
        {
          label: "ยอดรับชำระสำเร็จ",
          val: "฿" + this.fmtNum(payPaidSum, 2),
          fg: "#1F1F1F",
          sub: "รวมค่าชาร์จ เติมเงิน & สมาชิก",
          badge: "Settled",
          badgeStyle:
            "padding: 3px 10px; border-radius: 999px; background: #E7F6EE; color: #146C3E; font-size: 12px; font-weight: 700",
          cardStyle:
            "background: #FFFFFF; border: 1.5px solid " +
            accent +
            "; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(252,57,1,0.08); cursor: pointer",
          isPaid: true,
          isWarn: false,
          isBank: false,
          isWallet: false,
          filterPending: () =>
            this.setState({
              paySubTab: "tx",
              payFilter: "paid",
              payMenuId: "",
            }),
        },
        {
          label: "รอตรวจสอบ / ไม่สำเร็จ",
          val: String(payPendCount) + " รายการ",
          fg: "#C42D00",
          sub: "รวมเคสเติมเงินไม่เข้า / ตัดไม่ผ่าน",
          badge: "ต้องตรวจสอบ",
          badgeStyle:
            "padding: 3px 9px; border-radius: 999px; background: #FDECEC; color: #B42318; font-size: 12px; font-weight: 700; white-space: nowrap",
          cardStyle:
            "background: #FFF7F3; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03); cursor: pointer",
          isPaid: false,
          isWarn: true,
          isBank: false,
          isWallet: false,
          filterPending: () =>
            this.setState({
              paySubTab: "tx",
              payFilter: "pending",
              payMenuId: "",
            }),
        },
        {
          label: "โอนเข้าบัญชีบริษัทแล้ว",
          val: "฿" + this.fmtNum(gwMatchedSum, 2),
          fg: "#1F1F1F",
          sub:
            (/\(([^)]+)\)/.test(payCfg.bankName)
              ? payCfg.bankName.match(/\(([^)]+)\)/)[1]
              : payCfg.bankName) +
            " · " +
            payCfg.bankAcc,
          badge: payCfg.bankAcc,
          badgeStyle: "font-size: 12px; font-weight: 600; color: #6B6B6B",
          cardStyle:
            "background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03); cursor: pointer",
          isPaid: false,
          isWarn: false,
          isBank: true,
          isWallet: false,
          filterPending: () =>
            this.setState({ paySubTab: "gw", payMenuId: "" }),
        },
        {
          label: "ยอด Wallet ผู้ใช้รวม",
          val: "฿" + this.fmtNum(dash.walletSum, 2),
          fg: "#1F1F1F",
          sub: String(membersSrc.length) + " บัญชี · กระเป๋าเงินสมาชิกทั้งหมด",
          badge: String(membersSrc.length) + " บัญชี",
          badgeStyle: "font-size: 12px; font-weight: 600; color: #6B6B6B",
          cardStyle:
            "background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03); cursor: pointer",
          isPaid: false,
          isWarn: false,
          isBank: false,
          isWallet: true,
          filterPending: () =>
            this.setState({ paySubTab: "wallet", payMenuId: "" }),
        },
      ];
      const pfVal =
        ["paid", "pending", "failed", "refunded"].indexOf(st.payFilter) >= 0
          ? st.payFilter
          : "all";
      const payFilters = [
        ["all", "ทั้งหมด"],
        ["paid", "ชำระสำเร็จ"],
        ["pending", "รอตรวจสอบ (เติมไม่เข้า)"],
        ["failed", "ไม่สำเร็จ"],
        ["refunded", "คืนเงินแล้ว"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ payFilter: id, payMenuId: "" }),
        style:
          "height: 30px; padding: 0 10px; border-radius: 8px; border: 0; font-family: inherit; font-size: 13px; font-weight: " +
          (pfVal === id ? 700 : 600) +
          "; cursor: pointer; white-space: nowrap; " +
          (pfVal === id
            ? "background: #FFFFFF; color: #1F1F1F; box-shadow: 0 1px 3px rgba(15,23,42,0.08)"
            : "background: transparent; color: #5C5C5C"),
      }));
      const pq = String(st.paySearch || "")
        .trim()
        .toLowerCase();
      const pFrom = String(st.payFrom || "").trim();
      const pTo = String(st.payTo || "").trim();
      const filteredPays = payList.filter((p) => {
        if (pfVal !== "all" && p.status !== pfVal) return false;
        if (pFrom && p.dateIso && p.dateIso < pFrom) return false;
        if (pTo && p.dateIso && p.dateIso > pTo) return false;
        if (
          pq &&
          (
            String(p.id || "") +
            " " +
            String(p.memberName || "") +
            " " +
            String(p.memberMeta || "") +
            " " +
            String(p.channel || "") +
            " " +
            String(p.type || "") +
            " " +
            String(p.note || "")
          )
            .toLowerCase()
            .indexOf(pq) < 0
        )
          return false;
        return true;
      });
      const payRows = filteredPays.map((p) => {
        const [statText, statStyle] = payStatMeta(p.status);
        const slipBtnLabel = p.slipImg
          ? "✓ ดูสลิป"
          : p.status === "pending"
            ? "+ อัปโหลด / ตรวจสลิป"
            : p.status === "failed"
              ? "แนบสลิป / ตรวจยอด"
              : "อัปโหลด / แนบสลิป";
        const slipBtnStyle =
          "height: 28px; padding: 0 9px; border-radius: 8px; font-family: inherit; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; display: inline-flex; align-items: center; gap: 4px; " +
          (p.slipImg
            ? "border: 1px solid #E0E0E0; background: #E7F6EE; color: #146C3E"
            : p.status === "pending"
              ? "border: 1px solid #FDBA94; background: #FFF1EB; color: #C42D00"
              : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #5C5C5C");
        const openEdit = () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "pay_edit",
            modalErr: "",
            payMenuId: "",
            peEditId: p.id,
            peMemberId: p.memberId || "mb1",
            peMemberName: p.memberName || "",
            peAmount: String(p.amount || ""),
            peType: p.type || "ค่าชาร์จ EV",
            peChannel: p.channel || "",
            peStatus: p.status || "pending",
            peDate: p.dateIso || this.todayIso(),
            peTaxName: p.taxName || p.memberName || "",
            peTaxId: p.taxId || "",
            peNote: p.note || "",
          });
        };
        const openSlipM = () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "pay_slip",
            modalErr: "",
            payMenuId: "",
            slipPayId: p.id,
            slipPreview: p.slipImg || "",
            slipFileName: p.slipFileName || "",
            slipMime: p.slipMime || "",
          });
        };
        const openInvM = () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "pay_doc",
            modalErr: "",
            payMenuId: "",
            docPayId: p.id,
            docType: "inv",
          });
        };
        const openTaxM = () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "pay_doc",
            modalErr: "",
            payMenuId: "",
            docPayId: p.id,
            docType: "tax",
          });
        };
        const isMenuOpen = st.payMenuId === p.id;
        return {
          id: p.id,
          type: p.type,
          memberName: p.memberName,
          memberMeta: p.memberMeta,
          channelLine: p.channel,
          note: p.note,
          dateLabel: this.fmtThaiDate(this.parseIso(p.dateIso), true),
          amountText: "฿" + this.fmtNum(p.amount, 2),
          amtColorStyle:
            "font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; " +
            (p.status === "failed" ? "color: #B42318" : "color: #1F1F1F"),
          statText,
          statStyle,
          hasSlip: !!p.slipImg,
          slipTag: "มีสลิป: " + (p.slipFileName || "slip.png"),
          slipBtnLabel,
          slipBtnStyle,
          menuOpen: isMenuOpen,
          toggleMenu: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (st.payMenuId === p.id) {
              this.setState({ payMenuId: "" });
              return;
            }
            let top = 260,
              right = 44;
            if (
              e &&
              e.currentTarget &&
              e.currentTarget.getBoundingClientRect &&
              typeof window !== "undefined"
            ) {
              const r = e.currentTarget.getBoundingClientRect();
              const openUp = r.bottom + 190 > window.innerHeight;
              top = Math.round(
                openUp ? Math.max(16, r.top - 182) : r.bottom + 6,
              );
              right = Math.round(Math.max(16, window.innerWidth - r.right));
            }
            this.setState({
              payMenuId: p.id,
              payMenuTop: top,
              payMenuRight: right,
            });
          },
          edit: openEdit,
          openSlip: openSlipM,
          openInv: openInvM,
          openTax: openTaxM,
        };
      });
      const activePayRow = payRows.find((r) => r.menuOpen) || null;
      const gwRows = gwBatches.map((g) => {
        const matched = g.verifyStatus === "matched";
        return {
          batchId: g.batchId,
          dateText: String(g.txCount) + " รายการ · " + g.dateText,
          gateway: g.gateway,
          bankRef: g.bankRef,
          grossText: "฿" + this.fmtNum(g.gross, 2),
          feeText: "฿" + this.fmtNum(g.fee, 2),
          netText: "฿" + this.fmtNum(g.net, 2),
          statText: matched ? "ตรงยอดเข้าบัญชีแล้ว" : "รอตรวจสอบยอดเข้าบัญชี",
          statStyle:
            "padding: 3px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; " +
            (matched
              ? "background: #E7F6EE; color: #146C3E"
              : "background: #FFF4E0; color: #B86A00"),
          btnLabel: matched ? "ตรวจสอบแล้ว ✓" : "ยืนยันยอดเข้าบัญชี",
          btnStyle: matched
            ? "height: 30px; padding: 0 9px; border-radius: 8px; border: 1px solid #E0E0E0; background: #F6F6F6; font-family: inherit; font-size: 12.5px; font-weight: 600; color: #146C3E; cursor: default; white-space: nowrap"
            : "height: 30px; padding: 0 9px; border-radius: 8px; border: 0; background: " +
              accent +
              "; font-family: inherit; font-size: 12.5px; font-weight: 700; color: #FFFFFF; cursor: pointer; white-space: nowrap",
          verify: () => {
            if (!isSuper) {
              fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
              return;
            }
            if (matched) return;
            const refNum =
              "KB-" + String(Math.floor(100000 + Math.random() * 899999));
            const next = gwBatches.map((x) =>
              x.batchId === g.batchId
                ? Object.assign({}, x, {
                    verifyStatus: "matched",
                    bankRef: "โอนแล้ว · อ้างอิง " + refNum,
                  })
                : x,
            );
            this.saveStore("cx-bo-gw-batches", next);
            this.setState({ gwBatches: next });
            fireToast("ยืนยันเงินโอนจาก Payment Gateway เข้าบัญชีบริษัทแล้ว");
          },
        };
      });
      const rolePolicies = [
        {
          role: "ผู้ใช้ทั่วไป (Standard)",
          limitText: "วงเงินสูงสุด ฿5,000 · เติมล่วงหน้า",
        },
        {
          role: "สมาชิก VIP (Priority)",
          limitText: "วงเงิน ฿20,000 · เครดิตเงินคืน 5%",
        },
        {
          role: "องค์กร / Fleet (Corporate)",
          limitText: "วงเงิน ฿100,000 · วางบิล/ใบกำกับภาษี",
        },
      ];
      const roleRuleMap = {
        ผู้ใช้ทั่วไป: [
          "วงเงินสูงสุด ฿5,000 · เติมล่วงหน้า",
          "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #F4F4F4; color: #3A3A3A",
        ],
        "สมาชิก VIP": [
          "วงเงิน ฿20,000 · เครดิตเงินคืน 5%",
          "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #FFF4E0; color: #B86A00",
        ],
        "องค์กร / Fleet": [
          "วงเงิน ฿100,000 · วางบิล/ใบกำกับภาษี",
          "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #FFF1EB; color: #C42D00",
        ],
      };
      const wfVal =
        ["standard", "vip", "fleet", "suspended"].indexOf(
          st.walletRoleFilter,
        ) >= 0
          ? st.walletRoleFilter
          : "all";
      const walletRoleFilters = [
        ["all", "ทั้งหมด"],
        ["standard", "ผู้ใช้ทั่วไป"],
        ["vip", "สมาชิก VIP"],
        ["fleet", "องค์กร / Fleet"],
        ["suspended", "ระงับ Wallet"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ walletRoleFilter: id }),
        style: nwBtnStyle(wfVal === id),
      }));
      const wq = String(st.walletSearch || "")
        .trim()
        .toLowerCase();
      const payWalletRows = membersSrc
        .filter((m) => {
          const ur = m.userRole || "ผู้ใช้ทั่วไป";
          const ws = m.walletStatus || "active";
          if (wfVal === "standard" && ur !== "ผู้ใช้ทั่วไป") return false;
          if (wfVal === "vip" && ur !== "สมาชิก VIP") return false;
          if (wfVal === "fleet" && ur !== "องค์กร / Fleet") return false;
          if (wfVal === "suspended" && ws !== "suspended") return false;
          if (
            wq &&
            (m.name + " " + m.email + " " + ur).toLowerCase().indexOf(wq) < 0
          )
            return false;
          return true;
        })
        .map((m) => {
          const ur = m.userRole || "ผู้ใช้ทั่วไป";
          const ws = m.walletStatus || "active";
          const [roleRule, roleStyle] =
            roleRuleMap[ur] || roleRuleMap["ผู้ใช้ทั่วไป"];
          const susp = ws === "suspended";
          const debt = (Number(m.uncollected) || 0) > 0;
          return {
            name: m.name,
            email: m.email,
            userRole: ur,
            roleRule,
            roleStyle,
            walletText: "฿" + this.fmtNum(m.wallet, 2),
            uncollText: "฿" + this.fmtNum(m.uncollected, 2),
            uncollStyle:
              "font-weight: 700; color: " + (debt ? "#B42318" : "#6B6B6B"),
            statText: susp ? "ระงับชั่วคราว" : "ใช้งานปกติ",
            statStyle:
              "padding: 2px 8px; border-radius: 999px; font-size: 12.5px; font-weight: 700; " +
              (susp
                ? "background: #FDECEC; color: #B42318"
                : "background: #E7F6EE; color: #146C3E"),
            syncNote: m.id === "mb1" ? "ซิงค์แอป Wallet หลัก" : "บัญชีระบบ",
            openAdj: () => {
              if (!isSuper) {
                fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                return;
              }
              this.setState({
                modal: "wallet_adj",
                modalErr: "",
                waMemberId: m.id,
                waRole: ur,
                waMode: "credit",
                waAmount: "200",
                waReason: "",
                waStatus: ws,
              });
            },
          };
        });
      const slipPay = payList.find((p) => p.id === st.slipPayId) ||
        payList[0] || {
          id: "PAY-01",
          memberId: "mb1",
          memberName: "Sawanya Srisawat",
          amount: 500,
        };
      const docPay = payList.find((p) => p.id === st.docPayId) ||
        payList[0] || {
          id: "PAY-01",
          dateIso: this.todayIso(),
          memberName: "Sawanya Srisawat",
          type: "ค่าชาร์จ EV",
          channel: "PromptPay QR",
          amount: 500,
          status: "paid",
          note: "",
        };
      const docAmtNum = Number(docPay.amount) || 0;
      const docSubNum = +(docAmtNum / 1.07).toFixed(2);
      const docVatNum = +(docAmtNum - docSubNum).toFixed(2);
      const docIsTax = st.docType !== "inv";
      const waMember = membersSrc.find((m) => m.id === st.waMemberId) ||
        membersSrc[0] || {
          id: "mb1",
          name: "Sawanya Srisawat",
          email: "sawanya.s@example.com",
          wallet: 500,
          uncollected: 0,
          userRole: "ผู้ใช้ทั่วไป",
          walletStatus: "active",
        };
      const syncMemberWalletToApp = (
        memberId,
        nextBal,
        txTitle,
        amtNum,
        plus,
      ) => {
        if (memberId !== "mb1") return;
        try {
          localStorage.setItem("cx-wallet-bal", String(nextBal));
          const curTx = JSON.parse(
            localStorage.getItem("cx-wallet-tx") || "[]",
          );
          const rec = {
            id: "tx-bo-" + Date.now(),
            title: txTitle,
            sub: "วันนี้ · " + payCfg.company,
            amt: (plus ? "+฿" : "-฿") + (Number(amtNum) || 0).toFixed(2),
            plus: !!plus,
          };
          localStorage.setItem(
            "cx-wallet-tx",
            JSON.stringify([rec].concat(Array.isArray(curTx) ? curTx : [])),
          );
        } catch (e) {}
      };
      const stAllList = dash.stations;
      const stChargerSum = stAllList.reduce(
        (a, b) => a + (Number(b.chargerCount) || 1),
        0,
      );
      const stBaysSum = stAllList.reduce(
        (a, b) => a + (Number(b.totalBays) || 2),
        0,
      );
      const stDcCount = stAllList.reduce(
        (a, b) =>
          a +
          (/AC/i.test(String(b.power || "")) ? 0 : Number(b.chargerCount) || 1),
        0,
      );
      const stAcCount = Math.max(0, stChargerSum - stDcCount);
      const stFaultSum = stAllList.reduce(
        (a, b) => a + (Number(b.faultCount) || 0),
        0,
      );
      const stFaultStationCount = stAllList.filter(
        (s) => (Number(s.faultCount) || 0) > 0,
      ).length;
      const stOnlineCount = stAllList.filter(
        (s) => s.status === "online",
      ).length;
      const stChgCount = stAllList.filter(
        (s) => s.status === "charging",
      ).length;
      const stMaintCount = stAllList.filter((s) => s.status === "maint").length;
      const stActiveCount = stOnlineCount + stChgCount;
      const stOnlinePct = stAllList.length
        ? ((stActiveCount / stAllList.length) * 100).toFixed(1)
        : "0.0";
      const stKpis = [
        {
          label: "สถานีชาร์จทั้งหมด",
          val: String(stAllList.length) + " แห่ง",
          fg: "#1F1F1F",
          sub:
            "เปิดให้บริการ " + stActiveCount + " · ปิดปรับปรุง " + stMaintCount,
          badge: "Total",
          badgeStyle: "font-size: 12px; font-weight: 700; color: #C42D00",
          cardStyle:
            "background: #FFFFFF; border: 1.5px solid " +
            accent +
            "; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(252,57,1,0.08); cursor: pointer",
          isTotal: true,
          isUnits: false,
          isConn: false,
          isFaults: false,
          pickFilter: () =>
            this.setState({
              stFilter: "all",
              stOwnerFilter: "all",
              stMenuId: "",
            }),
        },
        {
          label: "ตู้ & หัวชาร์จรวม",
          val:
            this.fmtNum(stChargerSum) +
            " ตู้ / " +
            this.fmtNum(stBaysSum) +
            " หัว",
          fg: "#1F1F1F",
          sub: "DC Fast " + stDcCount + " ตู้ · AC " + stAcCount + " ตู้",
          badge: "Units",
          badgeStyle: "font-size: 12px; font-weight: 700; color: #5C5C5C",
          cardStyle:
            "background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03); cursor: pointer",
          isTotal: false,
          isUnits: true,
          isConn: false,
          isFaults: false,
          pickFilter: () =>
            this.setState({
              stViewMode: "table",
              stFilter: "all",
              stMenuId: "",
            }),
        },
        {
          label: "สถานะการเชื่อมต่อ",
          val: stOnlinePct + "% ออนไลน์",
          fg: "#1F1F1F",
          sub:
            "ออนไลน์ " +
            stOnlineCount +
            " · ชาร์จ " +
            stChgCount +
            " · ซ่อม " +
            stMaintCount,
          badge: "Live",
          badgeStyle: "font-size: 12px; font-weight: 700; color: #146C3E",
          cardStyle:
            "background: #FFFFFF; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03); cursor: pointer",
          isTotal: false,
          isUnits: false,
          isConn: true,
          isFaults: false,
          pickFilter: () => this.setState({ stFilter: "online", stMenuId: "" }),
        },
        {
          label: "สถิติแจ้งขัดข้องสะสม",
          val: this.fmtNum(stFaultSum) + " ครั้ง",
          fg: "#C42D00",
          sub: "พบประวัติใน " + stFaultStationCount + " สถานี (คลิกกรอง)",
          badge: "ต้องติดตาม",
          badgeStyle:
            "padding: 3px 9px; border-radius: 999px; background: #FDECEC; color: #B42318; font-size: 12px; font-weight: 700; white-space: nowrap",
          cardStyle:
            "background: #FFF7F3; border: 1px solid #E6E6E6; border-radius: 20px; padding: 18px 20px; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; box-shadow: 0 6px 20px rgba(15,23,42,0.03); cursor: pointer",
          isTotal: false,
          isUnits: false,
          isConn: false,
          isFaults: true,
          pickFilter: () => this.setState({ stFilter: "faults", stMenuId: "" }),
        },
      ];
      const stFilterVal =
        ["online", "charging", "maint", "faults"].indexOf(st.stFilter) >= 0
          ? st.stFilter
          : "all";
      const stFilters = [
        ["all", "ทั้งหมด (" + stAllList.length + ")"],
        ["online", "พร้อมใช้ (" + stOnlineCount + ")"],
        ["charging", "กำลังชาร์จ (" + stChgCount + ")"],
        ["maint", "บำรุงรักษา (" + stMaintCount + ")"],
        ["faults", "แจ้งขัดข้อง (" + stFaultStationCount + ")"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ stFilter: id, stMenuId: "" }),
        style:
          "height: 30px; padding: 0 10px; border-radius: 8px; border: 0; font-family: inherit; font-size: 13px; font-weight: " +
          (stFilterVal === id ? 700 : 600) +
          "; cursor: pointer; white-space: nowrap; " +
          (stFilterVal === id
            ? "background: #FFFFFF; color: #1F1F1F; box-shadow: 0 1px 3px rgba(15,23,42,0.08)"
            : "background: transparent; color: #5C5C5C"),
      }));
      const stOwnVal =
        ["chargex", "retail", "hub"].indexOf(st.stOwnerFilter) >= 0
          ? st.stOwnerFilter
          : "all";
      const inferOwnerCat = (s) => {
        if (s.ownerCategory) return s.ownerCategory;
        const ow = String(s.owner || "");
        if (ow.includes("ชาร์จ เอ็กซ์")) return "chargex";
        if (
          ow.includes("รีเทล") ||
          ow.includes("เซ็นทรัล") ||
          ow.includes("ซีคอน") ||
          ow.includes("ไบเทค")
        )
          return "retail";
        return "hub";
      };
      const stOwnerFilters = [
        ["all", "ทุกเจ้าของพื้นที่"],
        ["chargex", "Charge X ลงทุนเอง"],
        ["retail", "ห้าง & ศูนย์ประชุม"],
        ["hub", "ฮับพาร์ทเนอร์"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ stOwnerFilter: id, stMenuId: "" }),
        style: nwBtnStyle(stOwnVal === id),
      }));
      const stViewVal = st.stViewMode === "map" ? "map" : "table";
      const stViewBtns = [
        ["table", "มุมมองตาราง"],
        ["map", "มุมมองแผนที่"],
      ].map(([id, label]) => ({
        label,
        pick: () => this.setState({ stViewMode: id, stMenuId: "" }),
        style:
          "height: 30px; padding: 0 11px; border-radius: 8px; border: 0; font-family: inherit; font-size: 13px; font-weight: " +
          (stViewVal === id ? 700 : 600) +
          "; cursor: pointer; white-space: nowrap; " +
          (stViewVal === id
            ? "background: #FFFFFF; color: #1F1F1F; box-shadow: 0 1px 3px rgba(15,23,42,0.08)"
            : "background: transparent; color: #5C5C5C"),
      }));
      const stq = String(st.stSearch || "")
        .trim()
        .toLowerCase();
      const filteredStations = stAllList.filter((s) => {
        if (stFilterVal === "online" && s.status !== "online") return false;
        if (stFilterVal === "charging" && s.status !== "charging") return false;
        if (stFilterVal === "maint" && s.status !== "maint") return false;
        if (stFilterVal === "faults" && !((Number(s.faultCount) || 0) > 0))
          return false;
        if (stOwnVal !== "all" && inferOwnerCat(s) !== stOwnVal) return false;
        if (
          stq &&
          (
            String(s.code || "") +
            " " +
            String(s.name || "") +
            " " +
            String(s.owner || "") +
            " " +
            String(s.address || "") +
            " " +
            String(s.contactName || "") +
            " " +
            String(s.contactPhone || "")
          )
            .toLowerCase()
            .indexOf(stq) < 0
        )
          return false;
        return true;
      });
      const openStationEditor = (s, targetTab) => {
        if (!isSuper) {
          fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
          return;
        }
        const chargers = Math.max(1, Number(s.chargerCount) || 1);
        const bays = Math.max(1, Number(s.totalBays) || chargers * 2);
        const fc = Number(s.faultCount) || 0;
        this.setState({
          modal: "station",
          modalErr: "",
          stMenuId: "",
          stModalTab: targetTab || "general",
          stEditId: s.id,
          stCode:
            s.code ||
            "STN-" +
              String(s.id || "001")
                .replace(/\D/g, "")
                .padStart(3, "0"),
          stImg: s.img || "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
          stName: s.name || "",
          stNameEn: s.nameEn || "",
          stOwner: s.owner || payCfg.company,
          stContractType:
            s.contractType ||
            (inferOwnerCat(s) === "chargex"
              ? "ลงทุนเอง 100%"
              : "Revenue Sharing"),
          stOwnerTaxId: s.ownerTaxId || "0105564008912",
          stAddr: s.address || "",
          stArea: s.area || "",
          stLat: String(s.lat || "13.6682"),
          stLng: String(s.lng || "100.6845"),
          stMapUrl:
            s.mapUrl ||
            "https://www.google.com/maps?q=" +
              (s.lat || "13.6682") +
              "," +
              (s.lng || "100.6845"),
          stContactName: s.contactName || "",
          stContactPhone: s.contactPhone || "",
          stHours: s.hours || "เปิด 24 ชม.",
          stChargers: String(chargers),
          stBays: String(bays),
          stPower: s.power || "150 kW DC · 4 หัว",
          stStatus: s.status || "online",
          stFaultCount: String(fc),
          stFaultDate: s.lastFaultDate || "ยังไม่มีเหตุขัดข้อง",
          stFaultDetail: s.faultDetail || "",
          stUnits: this.stationUnitsFor(s, st.monitors),
          stIncidents: this.stationIncidentsFor(s),
          stNewUnitCode: "",
          stNewUnitPower: "150 kW DC · 2 หัว",
          stNewIncNote: "",
        });
      };
      const toggleStationMaint = (s) => {
        if (!isSuper) {
          fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
          return;
        }
        const nextStat = s.status === "maint" ? "online" : "maint";
        const rawList =
          st.stations && st.stations.length ? st.stations : this.seedStations();
        const nextSt = rawList.map((x) =>
          x.id === s.id
            ? Object.assign({}, x, {
                status: nextStat,
                freeBays:
                  nextStat === "maint"
                    ? 0
                    : Math.max(1, Number(x.totalBays) || 2),
              })
            : x,
        );
        let nextMon = st.monitors || [];
        if (s.monId) {
          nextMon = nextMon.map((m) =>
            m.id === s.monId
              ? Object.assign({}, m, {
                  status: nextStat,
                  load:
                    nextStat === "maint"
                      ? "บำรุงรักษาตามรอบ"
                      : "ว่างพร้อมให้บริการ",
                  car:
                    nextStat === "maint"
                      ? "ปิดใช้งานชั่วคราว"
                      : "พร้อมให้บริการ",
                })
              : m,
          );
          this.saveStore("cx-bo-monitors", nextMon);
        }
        this.saveStore("cx-bo-stations", nextSt);
        this.setState({ stations: nextSt, monitors: nextMon, stMenuId: "" });
        fireToast(
          nextStat === "maint"
            ? "ตั้งสถานีเข้าสู่โหมดบำรุงรักษาแล้ว"
            : "เปิดให้บริการสถานีตามปกติแล้ว",
        );
      };
      const deleteStationById = (targetId) => {
        if (!isSuper) {
          fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
          return;
        }
        const rawList =
          st.stations && st.stations.length ? st.stations : this.seedStations();
        const idxR = rawList.findIndex((x) => x.id === targetId);
        if (idxR < 0) {
          this.setState({ modal: "", stDelId: "", stMenuId: "" });
          return;
        }
        const removed = rawList[idxR];
        const next = rawList.filter((x) => x.id !== targetId);
        this.saveStore("cx-bo-stations", next);
        this.setState({
          stations: next,
          modal: "",
          stEditId: "",
          stDelId: "",
          stMenuId: "",
          modalErr: "",
          stUndo: removed,
          stUndoIdx: idxR,
          nwUndo: null,
          tutUndo: null,
          cpUndo: null,
        });
        fireToast("ลบสถานีชาร์จแล้ว", true);
      };
      const selMapRaw =
        filteredStations.find((s) => s.id === st.stMapSelId) ||
        filteredStations[0] ||
        stAllList[0];
      const mapLats = filteredStations.map((s) => parseFloat(s.lat) || 13.6682);
      const mapLngs = filteredStations.map(
        (s) => parseFloat(s.lng) || 100.6845,
      );
      const minLat = mapLats.length ? Math.min.apply(null, mapLats) : 13.64;
      const maxLat = mapLats.length ? Math.max.apply(null, mapLats) : 13.7;
      const minLng = mapLngs.length ? Math.min.apply(null, mapLngs) : 100.6;
      const maxLng = mapLngs.length ? Math.max.apply(null, mapLngs) : 100.72;
      const latSpan = Math.max(0.03, maxLat - minLat);
      const lngSpan = Math.max(0.04, maxLng - minLng);
      const placedPins = [];
      const stCards = filteredStations.map((s, idx) => {
        const [statText] = stStatBadge(s.status);
        const fc = Number(s.faultCount) || 0;
        const chargers = Math.max(1, Number(s.chargerCount) || 1);
        const bays = Math.max(1, Number(s.totalBays) || chargers * 2);
        const free = Number(
          s.freeBays != null ? s.freeBays : Math.max(0, bays - 1),
        );
        const latNum = parseFloat(s.lat) || 13.6682;
        const lngNum = parseFloat(s.lng) || 100.6845;
        let px = Math.max(
          11,
          Math.min(89, Math.round(((lngNum - minLng) / lngSpan) * 76 + 12)),
        );
        let py = Math.max(
          22,
          Math.min(88, Math.round((1 - (latNum - minLat) / latSpan) * 64 + 22)),
        );
        for (let p = 0; p < placedPins.length; p++) {
          const prev = placedPins[p];
          if (Math.abs(px - prev.x) < 15 && Math.abs(py - prev.y) < 11) {
            py =
              py >= prev.y
                ? Math.min(89, prev.y + 12)
                : Math.max(22, prev.y - 12);
            if (Math.abs(py - prev.y) < 10)
              px =
                px >= prev.x
                  ? Math.min(89, prev.x + 15)
                  : Math.max(11, prev.x - 15);
          }
        }
        placedPins.push({ x: px, y: py });
        const bgStat =
          s.status === "maint"
            ? "background: #FFF4E0; color: #B86A00"
            : s.status === "charging"
              ? "background: #FFF1EB; color: #C42D00"
              : "background: #E7F6EE; color: #146C3E";
        const pinColor =
          fc >= 3
            ? "#B42318"
            : s.status === "maint"
              ? "#B86A00"
              : s.status === "charging"
                ? "#FC3901"
                : "#146C3E";
        const isSel = selMapRaw && selMapRaw.id === s.id;
        const phoneParts = String(s.contactPhone || "").split("·");
        const code = s.code || "STN-" + String(idx + 1).padStart(3, "0");
        const contractType =
          s.contractType ||
          (inferOwnerCat(s) === "chargex"
            ? "ลงทุนเอง 100%"
            : "Revenue Sharing");
        return {
          id: s.id,
          code,
          name: s.name,
          area: s.area || "",
          power: s.power || "120 kW DC",
          img: s.img || "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
          owner: s.owner || payCfg.company,
          contractType,
          address: s.address || s.area || "",
          lat: s.lat || "13.6682",
          lng: s.lng || "100.6845",
          mapUrl:
            s.mapUrl ||
            "https://www.google.com/maps?q=" +
              (s.lat || "13.6682") +
              "," +
              (s.lng || "100.6845"),
          coordText: (s.lat || "13.6682") + ", " + (s.lng || "100.6845"),
          contactNameOnly: s.contactName || "",
          contactChannel: phoneParts[0] ? phoneParts[0].trim() : "",
          contactText:
            (s.contactName || "") +
            (s.contactPhone ? " · " + s.contactPhone : ""),
          chargerText:
            String(chargers) + " ตู้ชาร์จ · " + String(bays) + " หัวชาร์จ",
          chargerNumText: String(chargers) + " ตู้ (" + String(bays) + " หัว)",
          baysSubText:
            String(s.power || "150 kW DC")
              .split("·")[0]
              .trim() +
            " · ว่าง " +
            String(free),
          faultText:
            "ขัดข้อง " +
            fc +
            " ครั้ง (" +
            (s.lastFaultDate || "ยังไม่มีเหตุขัดข้อง") +
            ")",
          faultShort: fc === 0 ? "0 ครั้ง" : String(fc) + " ครั้ง",
          lastFaultDate: s.lastFaultDate || "ยังไม่มีเหตุขัดข้อง",
          faultPillStyle:
            "padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-block; white-space: nowrap; " +
            (fc >= 3
              ? "background: #FDECEC; color: #B42318"
              : fc > 0
                ? "background: #FFF4E0; color: #B86A00"
                : "background: #F4F4F4; color: #5C5C5C"),
          faultStyle:
            "font-weight: 700; color: " +
            (fc > 2 ? "#B42318" : fc > 0 ? "#B86A00" : "#146C3E"),
          faultNote:
            "สถิติล่าสุด: " +
            (s.faultDetail || "ไม่พบแจ้งขัดข้องในช่วง 30 วันที่ผ่านมา"),
          uptimeText:
            "Uptime " +
            Number(s.uptimePct != null ? s.uptimePct : 99.5).toFixed(1) +
            "% · ขัดข้อง " +
            fc +
            " ครั้ง",
          statText: s.status === "online" ? "เปิดให้บริการ" : statText,
          statPillStyle:
            "padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 700; display: inline-block; white-space: nowrap; " +
            bgStat,
          statBadgePosStyle:
            "position: absolute; top: 10px; right: 10px; padding: 3px 9px; border-radius: 999px; font-size: 12.5px; font-weight: 700; " +
            bgStat,
          maintToggleLabel:
            s.status === "maint" ? "เปิดให้บริการปกติ" : "สลับโหมดบำรุงรักษา",
          mapPinStyle:
            "position: absolute; left: " +
            px +
            "%; top: " +
            py +
            "%; transform: translate(-50%, -50%); padding: 5px 9px; border-radius: 999px; border: " +
            (isSel ? "2px solid " + accent : "1px solid #E2E8F0") +
            "; background: " +
            (isSel ? "#1F1F1F" : "#FFFFFF") +
            "; color: " +
            (isSel ? "#FFFFFF" : "#1F1F1F") +
            "; box-shadow: 0 6px 16px rgba(15,23,42,0.16); display: inline-flex; align-items: center; gap: 5px; font-family: inherit; font-size: 12px; font-weight: 700; cursor: pointer; white-space: nowrap; z-index: " +
            (isSel ? 12 : 4),
          mapPinDotStyle:
            "width: 8px; height: 8px; border-radius: 999px; background: " +
            pinColor +
            "; flex: none",
          isMapSelected: !!isSel,
          menuOpen: st.stMenuId === s.id,
          pickMap: () => this.setState({ stMapSelId: s.id }),
          copyCoord: () => {
            const text = (s.lat || "13.6682") + "," + (s.lng || "100.6845");
            try {
              if (
                typeof navigator !== "undefined" &&
                navigator.clipboard &&
                navigator.clipboard.writeText
              )
                navigator.clipboard.writeText(text);
            } catch (e) {}
            fireToast("คัดลอกพิกัด GPS แล้ว: " + text);
          },
          toggleMaint: () => toggleStationMaint(s),
          toggleMenu: (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            if (st.stMenuId === s.id) {
              this.setState({ stMenuId: "" });
              return;
            }
            let top = 280,
              right = 44;
            if (
              e &&
              e.currentTarget &&
              e.currentTarget.getBoundingClientRect &&
              typeof window !== "undefined"
            ) {
              const r = e.currentTarget.getBoundingClientRect();
              const openUp = r.bottom + 185 > window.innerHeight;
              top = Math.round(
                openUp ? Math.max(16, r.top - 178) : r.bottom + 6,
              );
              right = Math.round(Math.max(16, window.innerWidth - r.right));
            }
            this.setState({
              stMenuId: s.id,
              stMenuTop: top,
              stMenuRight: right,
            });
          },
          edit: () => openStationEditor(s, "general"),
          askDel: () => {
            if (!isSuper) {
              fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
              return;
            }
            this.setState({
              modal: "station_del",
              stDelId: s.id,
              stMenuId: "",
              modalErr: "",
            });
          },
          del: () => deleteStationById(s.id),
        };
      });
      const activeStMenuRow = stCards.find((r) => r.menuOpen) || null;
      const stMapSel = stCards.find(
        (r) => r.id === (selMapRaw && selMapRaw.id),
      ) ||
        stCards[0] || {
          id: "st0",
          code: "STN-000",
          name: "ไม่พบสถานี",
          area: "",
          power: "-",
          img: "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
          owner: "-",
          contractType: "-",
          address: "-",
          coordText: "-",
          mapUrl: "#",
          contactText: "-",
          chargerText: "-",
          faultText: "-",
          statText: "-",
          statPillStyle: "",
          faultPillStyle: "",
          edit: () => {},
          copyCoord: () => {},
        };
      const stImgPresets = [
        ["ภาพสถานีจริง", "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg"],
        ["ภาพจุดชาร์จเร็ว DC", this.stImgPresetUrl("fast")],
        ["ภาพลานจอดห้าง", this.stImgPresetUrl("mall")],
        ["ภาพสถานีริมทาง", this.stImgPresetUrl("highway")],
      ].map(([label, src]) => {
        const on = String(st.stImg || "").trim() === src;
        return {
          label,
          pick: () => this.setState({ stImg: src, modalErr: "" }),
          style:
            "height: 28px; padding: 0 10px; border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: " +
            (on ? 700 : 600) +
            "; cursor: pointer; " +
            (on
              ? "border: 0; background: " + accent + "; color: #FFFFFF"
              : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
        };
      });
      const TOP_SEARCH_KEY = {
        dashboard: "memSearch",
        operators: "umSearch",
        stations: "stSearch",
        coupons: "cpSearch",
        news: "nwSearch",
        payments: "paySearch",
        reports: "rpSearch",
      };
      const applyTopSearch = (val) => {
        const patch = {
          topSearch: val,
          lErr: "",
          modalErr: "",
          langMenuOpen: false,
        };
        const key = TOP_SEARCH_KEY[activeTab];
        if (key) patch[key] = val;
        this.setState(patch);
      };
      return {
        theme: d ? "dark" : "light",
        accent,
        isLogin: !curUser,
        isDash: !!curUser,
        langBtn: en ? "EN / TH" : "ไทย / EN",
        toggleLang: () => {
          const nl = en ? "th" : "en";
          try {
            localStorage.setItem("cx-lang", nl);
          } catch (e) {}
          this.setState({ lang: nl, langMenuOpen: false });
        },
        langDropLabel: en ? "English" : "ภาษาไทย",
        langMenuOpen: !!st.langMenuOpen,
        toggleLangMenu: () => this.setState({ langMenuOpen: !st.langMenuOpen }),
        closeLangMenu: () => this.setState({ langMenuOpen: false }),
        langOpts: [
          ["th", "ไทย (TH)"],
          ["en", "English (EN)"],
        ].map(([code, label]) => {
          const on = code === (en ? "en" : "th");
          return {
            label,
            on,
            pick: () => {
              try {
                localStorage.setItem("cx-lang", code);
              } catch (e) {}
              this.setState({ lang: code, langMenuOpen: false });
            },
            style:
              "width: 100%; height: 38px; padding: 0 12px; border-radius: 10px; border: 0; font-family: inherit; font-size: 14px; font-weight: " +
              (on ? 700 : 600) +
              "; cursor: pointer; display: flex; align-items: center; justify-content: space-between; " +
              (on
                ? "background: #FFF1EB; color: #C42D00"
                : "background: transparent; color: #3A3A3A"),
          };
        }),
        lUser: st.lUser,
        lPw: st.lPw,
        lPwType: st.lShowPw ? "text" : "password",
        onLUser: setVal("lUser"),
        onLPw: setVal("lPw"),
        toggleLPw: () => this.setState({ lShowPw: !st.lShowPw }),
        fillAdmin: () =>
          this.setState({ lUser: "superadmin", lPw: "Admin@1234", lErr: "" }),
        fillOp: () =>
          this.setState({
            lUser: "nattapong@chargex.co.th",
            lPw: "Op@123456",
            lErr: "",
          }),
        lPwRules: pwRules(st.lPw),
        hasLErr: !!st.lErr,
        lErr: st.lErr,
        doLogin: () => {
          const idRaw = String(st.lUser || "").trim();
          const idLow = idRaw.toLowerCase();
          const pw = String(st.lPw || "");
          if (!idRaw) {
            this.setState({ lErr: "กรุณากรอก Username หรืออีเมลบริษัท" });
            return;
          }
          if (!pw) {
            this.setState({ lErr: "กรุณากรอกรหัสผ่าน" });
            return;
          }
          if (!this.checkPw(pw).ok) {
            const accessLogs = this.recordAccess(
              idRaw,
              idRaw,
              "operator",
              "เข้าสู่ระบบไม่สำเร็จ (รหัสผ่านไม่ผ่านเกณฑ์)",
              "denied",
            );
            this.setState({
              lErr: "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
              accessLogs,
            });
            return;
          }
          const match = st.users.find(
            (u) =>
              u.email.toLowerCase() === idLow ||
              (u.role === "super_admin" && u.username.toLowerCase() === idLow),
          );
          if (!match) {
            if (idRaw.indexOf("@") >= 0 && !this.isCorpEmail(idRaw)) {
              const accessLogs = this.recordAccess(
                "ผู้ใช้ภายนอกระบบ",
                idRaw,
                "operator",
                "เข้าสู่ระบบไม่สำเร็จ (ไม่ใช่ @chargex.co.th)",
                "denied",
              );
              this.setState({
                lErr: "บัญชี Operator ต้องเข้าสู่ระบบด้วยอีเมลบริษัท (@chargex.co.th) เท่านั้น",
                accessLogs,
              });
              return;
            }
            const opByLocal = st.users.find(
              (u) =>
                u.role === "operator" &&
                u.email.split("@")[0].toLowerCase() === idLow,
            );
            if (opByLocal) {
              const accessLogs = this.recordAccess(
                "ผู้ใช้ภายนอกระบบ",
                idRaw,
                "operator",
                "เข้าสู่ระบบไม่สำเร็จ (ไม่ใช่ @chargex.co.th)",
                "denied",
              );
              this.setState({
                lErr: "บัญชี Operator ต้องเข้าสู่ระบบด้วยอีเมลบริษัท (@chargex.co.th) เท่านั้น",
                accessLogs,
              });
              return;
            }
            const accessLogs = this.recordAccess(
              idRaw,
              idRaw,
              "operator",
              "เข้าสู่ระบบไม่สำเร็จ (ข้อมูลไม่ถูกต้อง)",
              "denied",
            );
            this.setState({
              lErr: "Username / อีเมล หรือรหัสผ่านไม่ถูกต้อง",
              accessLogs,
            });
            return;
          }
          if (match.role === "operator" && !this.isCorpEmail(idRaw)) {
            const accessLogs = this.recordAccess(
              match.name,
              idRaw,
              match.role,
              "เข้าสู่ระบบไม่สำเร็จ (ไม่ใช่ @chargex.co.th)",
              "denied",
            );
            this.setState({
              lErr: "บัญชี Operator ต้องเข้าสู่ระบบด้วยอีเมลบริษัท (@chargex.co.th) เท่านั้น",
              accessLogs,
            });
            return;
          }
          if (match.status !== "active") {
            const accessLogs = this.recordAccess(
              match.name,
              match.email,
              match.role,
              "เข้าสู่ระบบไม่สำเร็จ (บัญชีถูกระงับ)",
              "denied",
            );
            this.setState({
              lErr: "บัญชีนี้ถูกระงับการใช้งานชั่วคราว",
              accessLogs,
            });
            return;
          }
          if (match.password !== pw) {
            const accessLogs = this.recordAccess(
              match.name,
              match.email,
              match.role,
              "เข้าสู่ระบบไม่สำเร็จ (ข้อมูลไม่ถูกต้อง)",
              "denied",
            );
            this.setState({
              lErr: "Username / อีเมล หรือรหัสผ่านไม่ถูกต้อง",
              accessLogs,
            });
            return;
          }
          const accessLogs = this.recordAccess(
            match.name,
            match.email,
            match.role,
            "เข้าสู่ระบบ Back Office",
            "ok",
          );
          this.saveStore("cx-bo-session", {
            id: match.id,
            role: match.role,
            email: match.email,
          });
          this.setState({
            curId: match.id,
            tab: match.role === "super_admin" ? "dashboard" : "coupons",
            lErr: "",
            lPw: "",
            accessLogs,
          });
          fireToast(
            "เข้าสู่ระบบด้วย " +
              (match.role === "super_admin" ? "Super Admin" : "Operator"),
          );
        },
        doLogout: () => {
          const accessLogs = this.recordAccess(
            curUser ? curUser.name : "Back Office User",
            curUser ? curUser.email : "-",
            curUser ? curUser.role : "operator",
            "ออกจากระบบ Back Office",
            "logout",
          );
          try {
            localStorage.removeItem("cx-bo-session");
          } catch (e) {}
          this.setState({
            curId: "",
            lErr: "",
            modal: "",
            modalErr: "",
            accessLogs,
          });
          fireToast("ออกจากระบบเรียบร้อยแล้ว");
        },
        navItems,
        curName: curUser ? curUser.name : "",
        curEmail: curUser ? curUser.email : "",
        curUidText: curUser ? "ID: " + curUser.id : "",
        curInitial: (dispName || "C").slice(0, 1).toUpperCase(),
        curAvatar:
          curUser && curUser.avatar
            ? curUser.avatar
            : this.avatarPresetUrl(isSuper ? "admin" : "op"),
        curRoleLabel: isSuper
          ? "Super Admin"
          : curUser && curUser.roleName
            ? curUser.roleName
            : "Operator",
        curRoleBadgeFg: isSuper ? "#F7D774" : "#5AD49B",
        curRolePillStyle:
          "padding: 3px 9px; border-radius: 999px; font-size: 12.5px; font-weight: 700; " +
          (isSuper
            ? "background: #FFF1EB; color: #C42D00"
            : "background: #E7F6EE; color: #146C3E"),
        curRoleScope: isSuper
          ? "สิทธิ์เต็มระบบ + เพิ่ม/จัดการ Operator"
          : fmtPerms(curPerms, false),
        pageTitle: PAGE_META[activeTab][0],
        pageSub: PAGE_META[activeTab][1],
        isTabDash: canView("dashboard") && activeTab === "dashboard",
        isTabOps: canView("operators") && activeTab === "operators",
        isTabStations: canView("stations") && activeTab === "stations",
        isTabCoupons: canView("coupons") && activeTab === "coupons",
        isTabNews: canView("news") && activeTab === "news",
        isTabMonitor: canView("monitor") && activeTab === "monitor",
        isTabTutorial: canView("tutorial") && activeTab === "tutorial",
        isTabPayments: canView("payments") && activeTab === "payments",
        isTabReports: canView("reports") && activeTab === "reports",
        isTabSettings: canView("settings") && activeTab === "settings",
        dFrom: dash.fromIso,
        dTo: dash.toIso,
        dRangeText: dash.rangeStr,
        onDFrom: (e) => {
          const v = e && e.target ? e.target.value : "";
          if (v)
            this.setState((prev) => ({
              dPreset: "custom",
              dFrom: v,
              dTo: v > prev.dTo ? v : prev.dTo,
            }));
        },
        onDTo: (e) => {
          const v = e && e.target ? e.target.value : "";
          if (v)
            this.setState((prev) => ({
              dPreset: "custom",
              dTo: v,
              dFrom: v < prev.dFrom ? v : prev.dFrom,
            }));
        },
        exportExcel: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const xml = this.buildExcelXml(dash);
          const fn =
            "ChargeX-Dashboard-" + dash.fromIso + "_" + dash.toIso + ".xls";
          this._lastExcel = {
            filename: fn,
            xml,
            mime: "application/vnd.ms-excel",
          };
          try {
            if (
              typeof document !== "undefined" &&
              typeof Blob !== "undefined" &&
              typeof URL !== "undefined" &&
              URL.createObjectURL
            ) {
              const b = new Blob([xml], {
                type: "application/vnd.ms-excel;charset=utf-8",
              });
              const u = URL.createObjectURL(b);
              const a = document.createElement("a");
              a.href = u;
              a.download = fn;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => {
                try {
                  URL.revokeObjectURL(u);
                } catch (er) {}
              }, 1500);
            }
          } catch (er) {}
          fireToast("ส่งออกไฟล์ Excel (.xls) เรียบร้อยแล้ว");
        },
        exportPdf: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const html = this.buildPdfHtml(dash);
          this._lastPdfHtml = html;
          try {
            if (typeof document !== "undefined" && document.createElement) {
              const fr = document.createElement("iframe");
              fr.style.cssText =
                "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
              document.body.appendChild(fr);
              const doc =
                fr.contentDocument ||
                (fr.contentWindow && fr.contentWindow.document);
              if (doc) {
                doc.open();
                doc.write(html);
                doc.close();
                setTimeout(() => {
                  try {
                    if (fr.contentWindow) {
                      fr.contentWindow.focus();
                      fr.contentWindow.print();
                    }
                  } catch (e) {}
                  setTimeout(() => {
                    try {
                      if (fr.parentNode) fr.parentNode.removeChild(fr);
                    } catch (e) {}
                  }, 1000);
                }, 120);
              }
            }
          } catch (er) {}
          fireToast(
            'เปิดหน้าต่างส่งออก PDF เรียบร้อย (เลือก "บันทึกเป็น PDF")',
          );
        },
        dStTotalText: dash.stations.length + " สถานี",
        dStConnectorsText: dash.totConn + " หัวชาร์จ",
        dStOnlineText: "ออนไลน์ " + dash.stOnline,
        dStChgText: "กำลังชาร์จ " + dash.stChg,
        dStMaintText: "บำรุงรักษา " + dash.stMaint,
        dUsrTotalText: dash.members.length + " สมาชิก",
        dUsrActiveText: "ใช้งานช่วงนี้ " + dash.activeMembersInPeriod + " คน",
        dUsrNewText: "ใหม่ +" + dash.newMembersInPeriod + " คน",
        dWalletText: "฿" + this.fmtNum(dash.walletSum, 2),
        dFailedText: "฿" + this.fmtNum(dash.failedSum, 2),
        dFailedShortText:
          "฿" +
          this.fmtNum(dash.failedSum, 2) +
          " (" +
          dash.failedCount +
          " รายการ)",
        dFailedCountText:
          dash.failedCount + " รายการค้างชำระ (บัตรหมดอายุ / ค่าปรับค้างชำระ)",
        dKwhText: this.fmtNum(dash.totKwh, 1) + " kWh",
        dCarbonNumText: this.fmtNum(dash.totCarbon, 1) + " kg CO₂",
        dCarbonText: "ลด Carbon " + this.fmtNum(dash.totCarbon, 1) + " kg CO₂",
        dRevText: "รายได้ ฿" + this.fmtNum(dash.totRev, 2),
        dRevAmountText: "฿" + this.fmtNum(dash.totRev, 2),
        dRevPeriodSub: "รวมยอด " + dash.nDays + " วัน",
        dDailyAvgText: dash.dailyAvg + " ครั้ง/วัน",
        dSessTotalText: "รวมช่วงนี้ " + dash.totSess + " ครั้ง",
        dPeakDayText: "สูงสุด " + dash.peakSess + " ครั้ง/วัน",
        dGrowthText: (growthPos ? "▲ +" : "▼ ") + dash.growthSess + "%",
        dGrowthSubText:
          (growthPos ? "▲ +" : "▼ ") + dash.growthSess + "% เทียบช่วงก่อนหน้า",
        dGrowthInlineStyle:
          "font-size: 13.5px; font-weight: 700; color: " +
          (growthPos ? "#146C3E" : "#B42318"),
        dGrowthStyle:
          "padding: 3px 10px; border-radius: 999px; font-size: 13.5px; font-weight: 700; " +
          (growthPos
            ? "background: #E7F6EE; color: #146C3E"
            : "background: #FDECEC; color: #B42318"),
        dGrowthBigStyle:
          "font-size: 25px; font-weight: 700; line-height: 1.15; color: " +
          (growthPos ? "#146C3E" : "#B42318"),
        dAvailPctText: availPct + "%",
        dAvailBarStyle:
          "height: 100%; border-radius: 999px; background: #146C3E; width: " +
          availPct +
          "%",
        dSysHealthDashArr: ((availPct / 100) * 150.8).toFixed(1) + " 150.8",
        dSysHealthMainText:
          availPct + "% ออนไลน์ / " + maintPct + "% ซ่อมบำรุง",
        dSysHealthSubText:
          "พร้อมใช้งาน " +
          (dash.stOnline + dash.stChg) +
          " / " +
          dash.stations.length +
          " แห่ง",
        dUsrActivePctText: usrActPct + "%",
        dUsrActiveDashArr: ((usrActPct / 100) * 150.8).toFixed(1) + " 150.8",
        dUsrRatioText:
          dash.activeMembersInPeriod + "/" + dash.members.length + " คน",
        dStPreviewRows: stDirRows.slice(0, 4),
        dMemPreviewRows: memberRows.slice(0, 4),
        dViewAllMemText:
          "เรียกดูรายชื่อสมาชิกทั้งหมด (" + dash.members.length + ") →",
        dGrowthKwhText:
          "พลังงาน " + (dash.growthKwh >= 0 ? "+" : "") + dash.growthKwh + "%",
        dGrowthUsrText: "สมาชิก +" + dash.growthUsers + "%",
        cmpSubText: "ช่วง " + dash.rangeStr + " เทียบช่วงก่อนหน้า",
        cmpMetricBtns,
        cmpGridStyle:
          "display: grid; grid-template-columns: repeat(" +
          dash.cmpBars.length +
          ", minmax(0, 1fr)); gap: 10px; align-items: end; padding: 14px 12px 10px; border-radius: 18px; background: #F6F6F6; border: 1px solid #EFEFEF",
        cmpBars: dash.cmpBars,
        cmpCurSum: "รวมช่วงปัจจุบัน: " + curSumFmt,
        cmpPrevSum: "รวมช่วงก่อนหน้า: " + prevSumFmt,
        cmpDiffText:
          "เปลี่ยนแปลง: " +
          diffFmt +
          " (" +
          (dash.cmpDiffPct >= 0 ? "+" : "") +
          dash.cmpDiffPct +
          "%)",
        stCompareRows,
        stDirRows,
        memSearch: st.memSearch,
        onMemSearch: (e) =>
          this.setState({
            memSearch: e && e.target ? e.target.value : "",
            memPage: 1,
          }),
        memFilters,
        memberRows,
        memPageRows,
        memPageBtns,
        memPageRangeText,
        memSumAllText: "สมาชิกทั้งหมด " + memAllCnt + " คน",
        memSumOkText: "ใช้งานปกติ " + memOkCnt + " คน",
        memSumDebtText:
          "มียอดค้างตัดไม่ได้ " +
          memDebtCnt +
          " คน (฿" +
          this.fmtNum(dash.failedSum, 2) +
          ")",
        prevMemPage: () =>
          this.setState({ memPage: Math.max(1, memCurPage - 1) }),
        nextMemPage: () =>
          this.setState({ memPage: Math.min(memTotalPages, memCurPage + 1) }),
        memCountBadge:
          "แสดง " +
          filteredMembers.length +
          " / " +
          dash.members.length +
          " คน",
        noMemMatch: filteredMembers.length === 0,
        openMembersModal: () => {
          if (!isSuper) return;
          this.setState({ modal: "members", modalErr: "", memPage: 1 });
        },
        showMembersModal: isSuper && st.modal === "members",
        opKpis,
        userRows,
        cpKpis,
        cpFilters,
        couponCards,
        nwKpis,
        nwFilters,
        newsCards,
        monKpis,
        monCards,
        tutKpis,
        tutCards,
        tutImgPresets,
        tutDots,
        tutPreviewDots,
        cpSearch: st.cpSearch,
        onCpSearch: setVal("cpSearch"),
        cpCountBadge:
          "แสดง " + filteredCoupons.length + " / " + cpList.length + " รายการ",
        noCpMatch: filteredCoupons.length === 0,
        noTutPages: st.tutorials.length === 0,
        nwSearch: st.nwSearch,
        onNwSearch: setVal("nwSearch"),
        nwCountBadge:
          "แสดง " + filteredNews.length + " / " + st.news.length + " รายการ",
        noNwMatch: filteredNews.length === 0,
        refreshMonitor: () => fireToast("อัปเดตสถานะตู้ชาร์จล่าสุดแล้ว"),
        openAddOp: () => {
          if (!isSuper) return;
          this.setState({
            modal: "op",
            modalErr: "",
            opName: "",
            opEmail: "",
            opPw: "",
          });
        },
        openPwModal: () =>
          this.setState({ modal: "pw", modalErr: "", newPw: "" }),
        openAddCoupon: () => {
          const today = this.todayIso();
          this.setState({
            modal: "coupon",
            modalErr: "",
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
            cpStartDate: today,
            cpEndDate: this.addDaysIso(today, 30),
            cpStackable: false,
            cpNewUserOnly: false,
            cpStatus: "avail",
          });
        },
        openAddNews: () =>
          this.setState({
            modal: "news",
            modalErr: "",
            nwPanelOpen: true,
            nwEditId: "",
            nwTag: "ข่าวสาร",
            nwTitle: "",
            nwBody: "",
            nwSendMode: "now",
            nwSchedDate: this.defaultSchedDate(),
            nwSchedTime: "09:00",
            nwStatus: "published",
          }),
        closeNwPanel: () => {
          clearInterval(this._tutT);
          const cur = st.nwEditId
            ? null
            : st.news.find((n) => n.id === "nw3") || st.news[0] || null;
          this.setState(
            Object.assign(
              {
                modal: "",
                modalErr: "",
                nwPanelOpen: false,
                tutAutoPlay: false,
              },
              cur
                ? {
                    nwEditId: cur.id,
                    nwTag: cur.tag || "ข่าวสาร",
                    nwTitle: cur.title || "",
                    nwBody: cur.body || "",
                    nwSendMode:
                      cur.sendMode === "scheduled" ? "scheduled" : "now",
                    nwSchedDate: cur.schedDate || this.defaultSchedDate(),
                    nwSchedTime: cur.schedTime || "09:00",
                    nwStatus: cur.status === "draft" ? "draft" : "published",
                  }
                : {},
            ),
          );
        },
        exportNwExcel: () => {
          if (!canView("news")) return;
          if (permPolicy.allowExportReports === false) {
            fireToast("สิทธิ์การส่งออกข้อมูลถูกปิดไว้ในตั้งค่าระบบ");
            return;
          }
          const xml = this.buildNewsExcelXml(filteredNews, payCfg);
          const fn = "ChargeX-Notifications-" + this.todayIso() + ".xls";
          this._lastNwExcel = {
            filename: fn,
            xml,
            mime: "application/vnd.ms-excel",
          };
          try {
            if (
              typeof document !== "undefined" &&
              typeof Blob !== "undefined" &&
              typeof URL !== "undefined" &&
              URL.createObjectURL
            ) {
              const b = new Blob([xml], {
                type: "application/vnd.ms-excel;charset=utf-8",
              });
              const u = URL.createObjectURL(b);
              const a = document.createElement("a");
              a.href = u;
              a.download = fn;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => {
                try {
                  URL.revokeObjectURL(u);
                } catch (er) {}
              }, 1500);
            }
          } catch (er) {}
          fireToast("ส่งออกรายงานการแจ้งเตือน Excel (.xls) เรียบร้อยแล้ว");
        },
        exportNwPdf: () => {
          if (!canView("news")) return;
          if (permPolicy.allowExportReports === false) {
            fireToast("สิทธิ์การส่งออกข้อมูลถูกปิดไว้ในตั้งค่าระบบ");
            return;
          }
          const html = this.buildNewsPdfHtml(filteredNews, payCfg);
          this._lastNwPdfHtml = html;
          try {
            if (typeof document !== "undefined" && document.createElement) {
              const fr = document.createElement("iframe");
              fr.style.cssText =
                "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
              document.body.appendChild(fr);
              const doc =
                fr.contentDocument ||
                (fr.contentWindow && fr.contentWindow.document);
              if (doc) {
                doc.open();
                doc.write(html);
                doc.close();
                setTimeout(() => {
                  try {
                    if (fr.contentWindow) {
                      fr.contentWindow.focus();
                      fr.contentWindow.print();
                    }
                  } catch (e) {}
                  setTimeout(() => {
                    try {
                      if (fr.parentNode) fr.parentNode.removeChild(fr);
                    } catch (e) {}
                  }, 1000);
                }, 120);
              }
            }
          } catch (er) {}
          fireToast("เปิดหน้าต่างส่งออก PDF การแจ้งเตือนเรียบร้อยแล้ว");
        },
        openAddTut: () => {
          if (!isSuper) return;
          clearInterval(this._tutT);
          this.setState({
            modal: "tut",
            modalErr: "",
            tutEditId: "",
            tutSpot: "promo",
            tutTitle: "",
            tutDesc: "",
            tutImg: this.tutImg("promo"),
            tutAutoPlay: false,
          });
        },
        openTutPreview: () => {
          if (!isSuper) return;
          if (!st.tutorials.length) {
            fireToast("ยังไม่มีหน้าสไลด์สำหรับแสดง");
            return;
          }
          clearInterval(this._tutT);
          this.setState({
            modal: "tut_preview",
            modalErr: "",
            tutSlide: 0,
            tutAutoPlay: false,
          });
        },
        closeModal: () => {
          clearInterval(this._tutT);
          this.setState({ modal: "", modalErr: "", tutAutoPlay: false });
        },
        showAddOp: isSuper && st.modal === "op",
        showPwModal: st.modal === "pw",
        showAddCoupon: st.modal === "coupon",
        showAddNews: st.modal === "news",
        showNwPanel: st.nwPanelOpen !== false || st.modal === "news",
        showTutModal: isSuper && st.modal === "tut",
        showTutPreview: isSuper && st.modal === "tut_preview" && tutTotal > 0,
        tutFrameSrc:
          (d ? "./GuideDark.dc.html" : "./Guide.dc.html") + "?preview=1",
        tutDrawerFrameSrc:
          (d ? "./GuideDark.dc.html" : "./Guide.dc.html") +
          "?preview=1&role=drawer",
        tutUserOpenHref: d ? "GuideDark.dc.html" : "Guide.dc.html",
        tutMainFrameRef: (el) => {
          this._tutFrames = this._tutFrames || {};
          const prev = this._tutFrames.main;
          this._tutFrames.main = el;
          if (el && el !== prev) this.syncTutFrames();
        },
        tutDrawerFrameRef: (el) => {
          this._tutFrames = this._tutFrames || {};
          const prev = this._tutFrames.drawer;
          this._tutFrames.drawer = el;
          if (el && el !== prev) this.syncTutFrames();
        },
        tutModalFrameRef: (el) => {
          this._tutFrames = this._tutFrames || {};
          const prev = this._tutFrames.modal;
          this._tutFrames.modal = el;
          if (el && el !== prev) this.syncTutFrames();
        },
        onTutFrameLoad: () => this.syncTutFrames(),
        tutModalTitle: st.tutEditId
          ? "แก้ไขหน้าสอนใช้งาน"
          : "เพิ่มหน้าสอนใช้งานใหม่",
        tutSaveBtn: st.tutEditId ? "บันทึกการแก้ไข" : "บันทึกหน้าสอนใช้งาน",
        tutCountText: String(tutTotal) + " หน้า",
        tutEditBadge: "หน้า " + (tutPreviewPos + 1) + " / " + tutPreviewTot,
        tutEditPagePill: "หน้าที่ " + (tutPreviewPos + 1),
        tutPreviewTitle:
          String(st.tutTitle || "").trim() || "ตัวอย่างหัวข้อหน้าสอนใช้งาน...",
        tutPreviewDesc:
          String(st.tutDesc || "").trim() ||
          "พิมพ์คำอธิบายเพื่อให้แสดงตัวอย่างหน้าจอมือถือแบบเรียลไทม์...",
        tutReplayEnabled: tutReplayOn,
        tutReplayEnabledStr: tutReplayOn ? "true" : "false",
        tutReplayStatText: tutReplayOn ? "เปิดใช้งานอยู่" : "ปิดการแสดงซ้ำ",
        tutReplayStatStyle:
          "padding: 3px 10px; border-radius: 999px; font-size: 12.5px; font-weight: 700; white-space: nowrap; " +
          (tutReplayOn
            ? "background: #E7F6EE; color: #146C3E"
            : "background: #F4F4F4; color: #6B6B6B"),
        tutReplaySwitchStyle:
          "width: 44px; height: 24px; padding: 3px; box-sizing: border-box; border-radius: 999px; border: 0; display: flex; align-items: center; cursor: pointer; flex: none; " +
          (tutReplayOn
            ? "background: #146C3E; justify-content: flex-end"
            : "background: #D4D4D8; justify-content: flex-start"),
        tutReplayKnobStyle:
          "width: 18px; height: 18px; border-radius: 50%; background: #FFFFFF; box-shadow: 0 1px 3px rgba(15,23,42,0.22); display: block; flex: none",
        toggleTutReplay: () => {
          if (!isSuper) return;
          const next = !(this.state.tutReplayEnabled !== false);
          try {
            localStorage.setItem(
              "cx-tutorial-replay-enabled",
              next ? "1" : "0",
            );
          } catch (e) {}
          this.setState({ tutReplayEnabled: next });
          fireToast(
            next
              ? "เปิดแสดงซ้ำการสอนใช้งานผ่านเมนูตั้งค่าในแอปแล้ว"
              : "ปิดแสดงซ้ำการสอนใช้งานผ่านเมนูตั้งค่าชั่วคราวแล้ว",
          );
        },
        onTutSwipeStart: (e) => {
          this._tutSwipeX = e && e.clientX != null ? e.clientX : null;
        },
        onTutSwipeEnd: (e) => {
          if (this._tutSwipeX == null || !tutTotal) return;
          const x = e && e.clientX != null ? e.clientX : null;
          const dx = x == null ? 0 : x - this._tutSwipeX;
          this._tutSwipeX = null;
          if (Math.abs(dx) < 32) return;
          clearInterval(this._tutT);
          this.setState({
            tutAutoPlay: false,
            tutSlide:
              dx < 0
                ? (tutIdx + 1) % tutTotal
                : (tutIdx - 1 + tutTotal) % tutTotal,
          });
        },
        showDrawerImgPreview:
          !!String(st.tutImg || "").trim() &&
          String(st.tutImg || "")
            .trim()
            .indexOf("data:image/svg+xml") !== 0,
        tutImgPreview: String(st.tutImg || "").trim() || this.tutImg("map"),
        tutImg: st.tutImg,
        onTutImg: setVal("tutImg"),
        tutTitle: st.tutTitle,
        onTutTitle: setVal("tutTitle"),
        tutDesc: st.tutDesc,
        onTutDesc: setVal("tutDesc"),
        onTutFile: (e) => {
          if (!isSuper) return;
          const f = e && e.target && e.target.files && e.target.files[0];
          if (!f) return;
          if (typeof FileReader !== "undefined") {
            const r = new FileReader();
            r.onload = () => {
              if (typeof r.result === "string" && r.result) {
                this.setState({ tutImg: r.result, modalErr: "" });
                fireToast("อัปโหลดรูปภาพเข้าสู่หน้าสอนใช้งานแล้ว");
              }
            };
            r.onerror = () =>
              this.setState({ modalErr: "ไม่สามารถอ่านไฟล์รูปภาพได้" });
            r.readAsDataURL(f);
          } else {
            this.setState({ modalErr: "ไม่สามารถอ่านไฟล์รูปภาพได้" });
          }
        },
        saveTut: () => {
          if (!isSuper) return;
          const img = String(st.tutImg || "").trim();
          const title = String(st.tutTitle || "").trim();
          const desc = String(st.tutDesc || "").trim();
          if (!img) {
            this.setState({ modalErr: "กรุณาเลือกรูปภาพหรืออัปโหลดรูปภาพ" });
            return;
          }
          if (!title) {
            this.setState({ modalErr: "กรุณากรอกหัวข้อหน้า" });
            return;
          }
          if (!desc) {
            this.setState({ modalErr: "กรุณากรอกคำอธิบาย" });
            return;
          }
          const spot = st.tutSpot || "promo";
          const isEdit = !!st.tutEditId;
          const next = isEdit
            ? st.tutorials.map((x) =>
                x.id === st.tutEditId
                  ? Object.assign({}, x, { spot, title, desc, img })
                  : x,
              )
            : st.tutorials.concat([
                { id: "t" + Date.now(), spot, title, desc, img },
              ]);
          this.saveStore("cx-tutorial-slides", next);
          this.setState({
            tutorials: next,
            modal: "",
            modalErr: "",
            tutEditId: "",
            tutTitle: "",
            tutDesc: "",
            tutSlide: isEdit
              ? Math.min(tutIdx, Math.max(0, next.length - 1))
              : Math.max(0, next.length - 1),
          });
          fireToast(
            isEdit
              ? "บันทึกการแก้ไขหน้าสอนใช้งานแล้ว"
              : "เพิ่มหน้าสอนใช้งานเรียบร้อยแล้ว",
          );
        },
        tutSlideBadge: "หน้า " + (tutIdx + 1) + " / " + Math.max(1, tutTotal),
        toggleTutPlay: () => {
          if (!isSuper) return;
          clearInterval(this._tutT);
          const nextOn = !this.state.tutAutoPlay;
          this.setState({ tutAutoPlay: nextOn });
          if (nextOn && this.state.tutorials.length > 1) {
            this._tutT = setInterval(() => {
              const len = this.state.tutorials.length;
              if (
                !len ||
                this.state.modal !== "tut_preview" ||
                !this.state.tutAutoPlay
              ) {
                clearInterval(this._tutT);
                return;
              }
              this.setState({
                tutSlide: ((this.state.tutSlide || 0) + 1) % len,
              });
            }, 3200);
          }
        },
        tutPlayBtnStyle:
          "height: 32px; padding: 0 12px; border-radius: 999px; font-family: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer; " +
          (st.tutAutoPlay
            ? "border: 0; background: " + accent + "; color: #FFFFFF"
            : "border: 1px solid #E0E0E0; background: #F6F6F6; color: #3A3A3A"),
        tutPlayLabel: st.tutAutoPlay ? "หยุดเล่นอัตโนมัติ" : "เล่นอัตโนมัติ",
        curTutImg: curTut.img || this.tutImg("map"),
        curTutTitle: curTut.title || "",
        curTutDesc: curTut.desc || "",
        tutPrev: () => {
          if (!tutTotal) return;
          clearInterval(this._tutT);
          this.setState({
            tutAutoPlay: false,
            tutSlide: (tutIdx - 1 + tutTotal) % tutTotal,
          });
        },
        tutNext: () => {
          if (!tutTotal) return;
          clearInterval(this._tutT);
          this.setState({
            tutAutoPlay: false,
            tutSlide: (tutIdx + 1) % tutTotal,
          });
        },
        tutReplay: () => {
          if (!tutTotal) return;
          clearInterval(this._tutT);
          this.setState({ tutAutoPlay: false, tutSlide: 0 });
          fireToast("เริ่มแสดงสไลด์โชว์ซ้ำตั้งแต่หน้าแรก");
        },
        hasModalErr: !!st.modalErr,
        modalErr: st.modalErr,
        opName: st.opName,
        opEmail: st.opEmail,
        opPw: st.opPw,
        onOpName: setVal("opName"),
        onOpEmail: setVal("opEmail"),
        onOpPw: setVal("opPw"),
        opPwRules: pwRules(st.opPw),
        genOpPw: () =>
          this.setState({
            opPw: "Op@" + Math.floor(10000 + Math.random() * 89999) + "x!",
            modalErr: "",
          }),
        saveOp: () => {
          if (!isSuper) return;
          const nm = String(st.opName || "").trim();
          const em = String(st.opEmail || "")
            .trim()
            .toLowerCase();
          const pw = String(st.opPw || "");
          if (!nm) {
            this.setState({ modalErr: "กรุณากรอกชื่อ-นามสกุล" });
            return;
          }
          if (!this.isCorpEmail(em)) {
            this.setState({
              modalErr: "Operator ต้องใช้อีเมลบริษัท (@chargex.co.th) เท่านั้น",
            });
            return;
          }
          if (st.users.some((u) => u.email.toLowerCase() === em)) {
            this.setState({ modalErr: "อีเมลบริษัทนี้มีในระบบแล้ว" });
            return;
          }
          if (!this.checkPw(pw).ok) {
            this.setState({
              modalErr:
                "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
            });
            return;
          }
          const opRoleObj = rolesList.find((r) => r.id === "role_op");
          const rec = {
            id: "op_" + Date.now(),
            role: "operator",
            roleId: "role_op",
            roleName: opRoleObj ? opRoleObj.name : "Operator",
            username: em,
            email: em,
            name: nm,
            phone: "081-200-0099",
            dept: "Back Office Operator",
            team: "Operations & Marketing",
            perms:
              opRoleObj && opRoleObj.perms
                ? opRoleObj.perms.slice()
                : ["coupons", "news", "monitor"],
            status: "active",
            password: pw,
            lastLogin: "ยังไม่เคยเข้าใช้",
          };
          const next = st.users.concat([rec]);
          this.saveStore("cx-bo-users", next);
          this.setState({ users: next, modal: "", modalErr: "" });
          fireToast("สร้างบัญชี Operator เรียบร้อยแล้ว");
        },
        newPw: st.newPw,
        onNewPw: setVal("newPw"),
        newPwRules: pwRules(st.newPw),
        saveNewPw: () => {
          if (!curUser) return;
          const pw = String(st.newPw || "");
          if (!this.checkPw(pw).ok) {
            this.setState({
              modalErr:
                "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
            });
            return;
          }
          const next = st.users.map((u) =>
            u.id === curUser.id ? Object.assign({}, u, { password: pw }) : u,
          );
          this.saveStore("cx-bo-users", next);
          this.setState({ users: next, modal: "", newPw: "", modalErr: "" });
          fireToast("เปลี่ยนรหัสผ่านสำเร็จ");
        },
        cpModalTitle: st.cpEditId ? "แก้ไขคูปองส่วนลด" : "สร้างคูปองใหม่",
        cpSaveBtn: st.cpEditId ? "บันทึกการแก้ไข" : "บันทึกคูปอง",
        cpCode: st.cpCode,
        cpTitle: st.cpTitle,
        cpVal: st.cpVal,
        cpMin: st.cpMin,
        cpMaxDisc: st.cpMaxDisc,
        cpTotalQty: st.cpTotalQty,
        cpPerUser: st.cpPerUser,
        cpStartDate: st.cpStartDate || this.todayIso(),
        cpEndDate: st.cpEndDate || this.addDaysIso(this.todayIso(), 30),
        cpIsPct: st.cpDiscType === "pct",
        cpValLabel:
          st.cpDiscType === "pct" ? "จำนวนที่ลด (%)" : "จำนวนที่ลด (บาท)",
        cpDiscTypeBtns: [
          ["flat", "หน่วยจำนวนเงิน (฿)"],
          ["pct", "ส่วนลดเปอร์เซ็น (%)"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ cpDiscType: id, modalErr: "" }),
          style: nwBtnStyle(
            st.cpDiscType !== "pct" ? id === "flat" : id === "pct",
          ),
        })),
        cpUsageBtns: cpUsageOpts.map((u) => ({
          label: u,
          pick: () => this.setState({ cpUsageType: u, modalErr: "" }),
          style: nwBtnStyle((st.cpUsageType || "สินค้าและบริการ") === u),
        })),
        cpStackBtns: [
          [false, "ไม่สามารถใช้ร่วมกับคูปองอื่น"],
          [true, "ใช้ร่วมกับคูปองอื่นได้"],
        ].map(([val, label]) => ({
          label,
          pick: () => this.setState({ cpStackable: val, modalErr: "" }),
          style: nwBtnStyle(!!st.cpStackable === val),
        })),
        cpStatBtns: [
          ["avail", "เปิดใช้งาน"],
          ["disabled", "ปิดใช้งาน"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ cpStatus: id, modalErr: "" }),
          style: nwBtnStyle(
            (st.cpStatus === "disabled" ? "disabled" : "avail") === id,
          ),
        })),
        cpNewUserOnly: !!st.cpNewUserOnly,
        cpNewUserStr: st.cpNewUserOnly ? "true" : "false",
        cpNewUserBadge: st.cpNewUserOnly ? "เฉพาะผู้ใช้ใหม่" : "ทั่วไป",
        cpNewUserWarn:
          !st.cpNewUserOnly &&
          (/ผู้ใช้ใหม่|สมาชิกใหม่|new\s*user/i.test(String(st.cpTitle || "")) ||
            /^NEW/i.test(String(st.cpCode || "").trim())),
        cpNewUserCardStyle:
          "padding: 13px 14px; border-radius: 14px; display: flex; flex-direction: column; gap: 7px; " +
          (st.cpNewUserOnly
            ? "background: #FFF1EB; border: 1.5px solid " + accent
            : "background: #FFF7F3; border: 1.5px dashed #FDBA94"),
        cpCheckBoxStyle:
          "width: 20px; height: 20px; flex: none; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; " +
          (st.cpNewUserOnly
            ? "background: " + accent + "; border: 0"
            : "background: #FFFFFF; border: 1.5px solid #D4D4D4"),
        toggleCpNewUser: () =>
          this.setState({
            cpNewUserOnly: !this.state.cpNewUserOnly,
            modalErr: "",
          }),
        onCpCode: setVal("cpCode"),
        onCpTitle: setVal("cpTitle"),
        onCpVal: setVal("cpVal"),
        onCpMin: setVal("cpMin"),
        onCpMaxDisc: setVal("cpMaxDisc"),
        onCpTotalQty: setVal("cpTotalQty"),
        onCpPerUser: setVal("cpPerUser"),
        onCpStartDate: (e) =>
          this.setState({
            cpStartDate: e && e.target ? e.target.value : "",
            modalErr: "",
          }),
        onCpEndDate: (e) =>
          this.setState({
            cpEndDate: e && e.target ? e.target.value : "",
            modalErr: "",
          }),
        saveCoupon: () => {
          const code = String(st.cpCode || "")
            .trim()
            .toUpperCase();
          const title = String(st.cpTitle || "").trim();
          const isPct = st.cpDiscType === "pct";
          const val = parseInt(st.cpVal, 10) || 0;
          const min = Math.max(0, parseInt(st.cpMin, 10) || 0);
          const maxDisc = isPct
            ? Math.max(1, parseInt(st.cpMaxDisc, 10) || val)
            : val;
          const totalQty = parseInt(st.cpTotalQty, 10) || 0;
          const perUserLimit = parseInt(st.cpPerUser, 10) || 0;
          const startDate = String(st.cpStartDate || "").trim();
          const endDate = String(st.cpEndDate || "").trim();
          const usageType = st.cpUsageType || "สินค้าและบริการ";
          const stackable = !!st.cpStackable;
          const newUserOnly = !!st.cpNewUserOnly;
          const status = st.cpStatus === "disabled" ? "disabled" : "avail";
          if (!code) {
            this.setState({ modalErr: "กรุณากรอกรหัสคูปอง" });
            return;
          }
          if (st.coupons.some((c) => c.code === code && c.id !== st.cpEditId)) {
            this.setState({ modalErr: "รหัสคูปองนี้มีในระบบแล้ว" });
            return;
          }
          if (!title) {
            this.setState({ modalErr: "กรุณากรอกชื่อคูปอง" });
            return;
          }
          if (val < 1) {
            this.setState({ modalErr: "กรุณาระบุส่วนลดตั้งแต่ 1 ขึ้นไป" });
            return;
          }
          if (isPct && val > 100) {
            this.setState({
              modalErr: "ส่วนลดเปอร์เซ็นต้องอยู่ระหว่าง 1% ถึง 100%",
            });
            return;
          }
          if (totalQty < 1) {
            this.setState({
              modalErr: "กรุณาระบุจำนวนคูปองในระบบตั้งแต่ 1 ขึ้นไป",
            });
            return;
          }
          if (perUserLimit < 1) {
            this.setState({
              modalErr:
                "กรุณาระบุจำนวนการใช้งานต่อ 1 ผู้ใช้ตั้งแต่ 1 ครั้งขึ้นไป",
            });
            return;
          }
          if (perUserLimit > totalQty) {
            this.setState({
              modalErr: "จำนวนการใช้งานต่อ 1 ผู้ใช้ต้องไม่เกินจำนวนคูปองในระบบ",
            });
            return;
          }
          if (!startDate || !endDate) {
            this.setState({ modalErr: "กรุณากำหนดวันเริ่มต้นและวันหมดอายุ" });
            return;
          }
          if (this.parseIso(endDate) < this.parseIso(startDate)) {
            this.setState({ modalErr: "วันหมดอายุต้องไม่น้อยกว่าวันเริ่มต้น" });
            return;
          }
          if (
            (/ผู้ใช้ใหม่|สมาชิกใหม่|new\s*user/i.test(title) ||
              /^NEW/i.test(code)) &&
            !newUserOnly
          ) {
            this.setState({
              modalErr:
                "โปรโมชั่นสำหรับผู้ใช้ใหม่ ต้องเลือกช่องเงื่อนไขสำหรับผู้ใช้ใหม่",
            });
            return;
          }
          const existing = st.cpEditId
            ? st.coupons.find((c) => c.id === st.cpEditId)
            : null;
          const kind =
            usageType === "เติมเงิน Wallet"
              ? "topup"
              : existing &&
                  existing.kind === "credit" &&
                  usageType === "สินค้าและบริการ"
                ? "credit"
                : "charge";
          const discType = isPct
            ? "pct"
            : kind === "topup"
              ? "bonus"
              : kind === "credit"
                ? "credit"
                : "flat";
          const discDesc = isPct ? "ลดสูงสุด ฿" + maxDisc : "ลด ฿" + val;
          const minDesc = min > 0 ? "ขั้นต่ำ ฿" + min : "ไม่มีขั้นต่ำ";
          const cond = discDesc + " · " + minDesc + " · " + usageType;
          const exp =
            "หมดอายุ " + this.fmtThaiDate(this.parseIso(endDate), true);
          const isEdit = !!st.cpEditId;
          let next;
          if (isEdit) {
            next = st.coupons.map((c) =>
              c.id === st.cpEditId
                ? Object.assign({}, c, {
                    code,
                    title,
                    kind,
                    discType,
                    discUnit: isPct ? "pct" : "flat",
                    discVal: val,
                    minSpend: min,
                    maxDisc,
                    usageType,
                    totalQty,
                    perUserLimit,
                    startDate,
                    endDate,
                    stackable,
                    newUserOnly,
                    status,
                    cond,
                    exp,
                  })
                : c,
            );
          } else {
            const rec = {
              id: "c_" + Date.now(),
              code,
              kind,
              discType,
              discUnit: isPct ? "pct" : "flat",
              discVal: val,
              minSpend: min,
              maxDisc,
              usageType,
              totalQty,
              usedQty: 0,
              perUserLimit,
              startDate,
              endDate,
              stackable,
              newUserOnly,
              title,
              cond,
              exp,
              status,
            };
            next = [rec].concat(st.coupons);
          }
          this.saveStore("cx-wallet-coupons", next);
          this.setState({
            coupons: next,
            modal: "",
            cpEditId: "",
            modalErr: "",
          });
          fireToast(
            isEdit ? "บันทึกการแก้ไขคูปองแล้ว" : "สร้างคูปองใหม่และซิงค์แล้ว",
          );
        },
        nwModalTitle: st.nwEditId
          ? "แก้ไขการแจ้งเตือน"
          : "สร้างการแจ้งเตือนใหม่",
        nwSaveBtn: st.nwEditId ? "บันทึกการตั้งค่า" : "บันทึกการแจ้งเตือน",
        nwTagBtns: nwTagOpts.map((tag) => {
          const on = (st.nwTag || "ข่าวสาร") === tag;
          return {
            label: tag,
            pick: () => this.setState({ nwTag: tag, modalErr: "" }),
            style:
              "height: 29px; padding: 0 10px; border-radius: 8px; font-family: inherit; font-size: 13px; font-weight: " +
              (on ? 700 : 600) +
              "; cursor: pointer; " +
              (on
                ? "border: 1.5px solid " +
                  accent +
                  "; background: #FFF1EB; color: #C42D00"
                : "border: 1px solid #E0E0E0; background: #F6F6F6; color: #3A3A3A"),
          };
        }),
        nwTitle: st.nwTitle,
        nwBody: st.nwBody,
        onNwTitle: setVal("nwTitle"),
        onNwBody: setVal("nwBody"),
        nwIsSched: st.nwSendMode === "scheduled" && st.nwStatus !== "draft",
        nwModeNowStyle: nwBtnStyle(st.nwSendMode !== "scheduled"),
        nwModeSchedStyle: nwBtnStyle(st.nwSendMode === "scheduled"),
        nwOptNowStyle:
          "flex: 1; height: 34px; padding: 0 8px; border-radius: 9px; border: 0; font-family: inherit; font-size: 13px; cursor: pointer; white-space: nowrap; " +
          (st.nwStatus !== "draft" && st.nwSendMode !== "scheduled"
            ? "background: #146C3E; color: #FFFFFF; font-weight: 700"
            : "background: transparent; color: #3A3A3A; font-weight: 600"),
        nwOptSchedStyle:
          "flex: 1; height: 34px; padding: 0 8px; border-radius: 9px; border: 0; font-family: inherit; font-size: 13px; cursor: pointer; white-space: nowrap; " +
          (st.nwStatus !== "draft" && st.nwSendMode === "scheduled"
            ? "background: " + accent + "; color: #FFFFFF; font-weight: 700"
            : "background: transparent; color: #3A3A3A; font-weight: 600"),
        nwOptDraftStyle:
          "flex: 1; height: 34px; padding: 0 8px; border-radius: 9px; border: 0; font-family: inherit; font-size: 13px; cursor: pointer; white-space: nowrap; " +
          (st.nwStatus === "draft"
            ? "background: #3A3A3A; color: #FFFFFF; font-weight: 700"
            : "background: transparent; color: #3A3A3A; font-weight: 600"),
        nwPreviewTitle:
          String(st.nwTitle || "").trim() || "ตัวอย่างพาดหัวการแจ้งเตือน...",
        nwPreviewBody:
          String(st.nwBody || "").trim() ||
          "พิมพ์คำอธิบายเพื่อดูตัวอย่างข้อความบนมือถือ...",
        nwPreviewTime:
          st.nwStatus === "draft"
            ? "แบบร่าง"
            : st.nwSendMode === "scheduled"
              ? (() => {
                  const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(
                    String(st.nwSchedDate || "").trim(),
                  );
                  const tm =
                    String(st.nwSchedTime || "09:00").trim() || "09:00";
                  return dm
                    ? this.fmtThaiDate(
                        Date.UTC(
                          parseInt(dm[1], 10),
                          parseInt(dm[2], 10) - 1,
                          parseInt(dm[3], 10),
                        ),
                        true,
                      ) +
                        " · " +
                        tm
                    : "กำหนดเวลา";
                })()
              : "ตอนนี้",
        nwPreviewMeta:
          (st.nwTag || "ข่าวสาร") +
          " · " +
          (st.nwStatus === "draft"
            ? "ยังไม่เผยแพร่"
            : st.nwSendMode === "scheduled"
              ? "ตั้งเวลาล่วงหน้า"
              : "เผยแพร่ทันที"),
        pickNwNow: () =>
          this.setState({
            nwSendMode: "now",
            nwStatus: "published",
            modalErr: "",
          }),
        pickNwSched: () =>
          this.setState({
            nwSendMode: "scheduled",
            nwStatus: "published",
            nwSchedDate: st.nwSchedDate || this.defaultSchedDate(),
            nwSchedTime: st.nwSchedTime || "09:00",
            modalErr: "",
          }),
        nwSchedDate: st.nwSchedDate || this.defaultSchedDate(),
        nwSchedTime: st.nwSchedTime || "09:00",
        onNwSchedDate: (e) =>
          this.setState({
            nwSchedDate: e && e.target ? e.target.value : "",
            modalErr: "",
          }),
        onNwSchedTime: (e) =>
          this.setState({
            nwSchedTime: e && e.target ? e.target.value : "",
            modalErr: "",
          }),
        nwStatPubStyle:
          "height: 32px; padding: 0 12px; border-radius: 9px; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; " +
          (st.nwStatus !== "draft"
            ? "border: 0; background: #146C3E; color: #FFFFFF"
            : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
        nwStatDraftStyle:
          "height: 32px; padding: 0 12px; border-radius: 9px; font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer; " +
          (st.nwStatus === "draft"
            ? "border: 0; background: #3A3A3A; color: #FFFFFF"
            : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
        pickNwPub: () => this.setState({ nwStatus: "published", modalErr: "" }),
        pickNwDraft: () => this.setState({ nwStatus: "draft", modalErr: "" }),
        nwStatusHint:
          st.nwStatus === "draft"
            ? "บันทึกเป็นแบบร่าง (ยังไม่แสดงในแอป)"
            : st.nwSendMode === "scheduled"
              ? "รอเผยแพร่อัตโนมัติตามวันและเวลาที่ตั้งไว้ล่วงหน้า"
              : "เผยแพร่ทันทีเมื่อบันทึก (แสดงในแอปและแจ้งเตือน)",
        saveNews: () => {
          const title = String(st.nwTitle || "").trim();
          const body = String(st.nwBody || "").trim();
          if (!title) {
            this.setState({ modalErr: "กรุณากรอกพาดหัว" });
            return;
          }
          if (!body) {
            this.setState({ modalErr: "กรุณากรอกคำอธิบาย" });
            return;
          }
          const nextStatus = st.nwStatus === "draft" ? "draft" : "published";
          const sched = st.nwSendMode === "scheduled" && nextStatus !== "draft";
          const sDate = String(st.nwSchedDate || "").trim();
          const sTime = String(st.nwSchedTime || "").trim();
          let dateLabel = "";
          if (sched) {
            const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(sDate);
            const tm = /^(\d{2}):(\d{2})$/.exec(sTime);
            if (!dm || !tm) {
              this.setState({
                modalErr: "กรุณากำหนดวันและเวลาแจ้งเตือนล่วงหน้า",
              });
              return;
            }
            const schedMs = new Date(
              parseInt(dm[1], 10),
              parseInt(dm[2], 10) - 1,
              parseInt(dm[3], 10),
              parseInt(tm[1], 10),
              parseInt(tm[2], 10),
            ).getTime();
            if (!isFinite(schedMs) || schedMs <= Date.now()) {
              this.setState({ modalErr: "กรุณากำหนดวันและเวลาในอนาคต" });
              return;
            }
            dateLabel =
              "ตั้งเวลา " +
              this.fmtThaiDate(
                Date.UTC(
                  parseInt(dm[1], 10),
                  parseInt(dm[2], 10) - 1,
                  parseInt(dm[3], 10),
                ),
                true,
              ) +
              " · " +
              sTime;
          } else {
            const nowDt = new Date();
            dateLabel = this.fmtThaiDate(
              Date.UTC(nowDt.getFullYear(), nowDt.getMonth(), nowDt.getDate()),
              true,
            );
          }
          const tag = st.nwTag || "ข่าวสาร";
          let next,
            toastMsg,
            savedId = st.nwEditId;
          if (st.nwEditId) {
            next = st.news.map((x) =>
              x.id === st.nwEditId
                ? Object.assign({}, x, {
                    tag,
                    title,
                    body,
                    status: nextStatus,
                    sendMode: sched ? "scheduled" : "now",
                    schedDate: sched ? sDate : "",
                    schedTime: sched ? sTime : "",
                    date: sched
                      ? dateLabel
                      : x.sendMode === "scheduled"
                        ? dateLabel
                        : x.date || dateLabel,
                  })
                : x,
            );
            toastMsg = "บันทึกการแก้ไขการแจ้งเตือนแล้ว";
          } else {
            savedId = "nw_" + Date.now();
            const rec = {
              id: savedId,
              tag,
              title,
              body,
              status: nextStatus,
              sendMode: sched ? "scheduled" : "now",
              schedDate: sched ? sDate : "",
              schedTime: sched ? sTime : "",
              date: dateLabel,
            };
            next = [rec].concat(st.news);
            toastMsg =
              nextStatus === "draft"
                ? "บันทึกการแจ้งเตือนเป็นแบบร่างแล้ว"
                : sched
                  ? "ตั้งเวลาแจ้งเตือนล่วงหน้าเรียบร้อยแล้ว"
                  : "เพิ่มและเผยแพร่การแจ้งเตือนแล้ว";
          }
          this.saveStore("cx-bo-news", next);
          this.setState({
            news: next,
            modal: "",
            nwPanelOpen: true,
            nwEditId: savedId,
            modalErr: "",
          });
          fireToast(toastMsg);
        },
        payKpis,
        paySubTabs,
        payFilters,
        payRows,
        gwRows,
        rolePolicies,
        walletRoleFilters,
        payWalletRows,
        payTabIsTx: paySubTabVal === "tx",
        payTabIsGw: paySubTabVal === "gw",
        payTabIsWallet: paySubTabVal === "wallet",
        hasOpenPayMenu: !!activePayRow,
        activePayMenu: activePayRow || {
          id: "",
          openInv: () => {},
          openTax: () => {},
          openSlip: () => {},
          edit: () => {},
        },
        payMenuPopStyle:
          "position: fixed; top: " +
          (st.payMenuTop || 260) +
          "px; right: " +
          (st.payMenuRight || 44) +
          "px; z-index: 65; width: 228px; padding: 6px; border-radius: 14px; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 16px 36px rgba(15,23,42,0.18); display: flex; flex-direction: column; gap: 2px; text-align: left",
        closePayMenu: () => this.setState({ payMenuId: "" }),
        peEditBadge: st.peEditId || "รายการใหม่",
        paySearch: st.paySearch,
        onPaySearch: setVal("paySearch"),
        payFrom: st.payFrom,
        payTo: st.payTo,
        onPayFrom: (e) =>
          this.setState({ payFrom: e && e.target ? e.target.value : "" }),
        onPayTo: (e) =>
          this.setState({ payTo: e && e.target ? e.target.value : "" }),
        resetPayFilters: () =>
          this.setState({
            paySearch: "",
            payFilter: "all",
            payFrom: "2026-11-01",
            payTo: "2026-11-30",
          }),
        payCountBadge:
          "แสดง " + filteredPays.length + " / " + payList.length + " รายการ",
        noPayMatch: filteredPays.length === 0,
        payBankSummary:
          "บัญชีรับโอน: " +
          payCfg.bankName +
          " · " +
          payCfg.bankAcc +
          " (" +
          payCfg.cycle +
          ")",
        payRoleGuardText: isSuper
          ? "สิทธิ์ปัจจุบัน: Super Admin — แก้ไขยอด ปลดล็อก Wallet & เปลี่ยนสิทธิ์ User Role ได้เต็มรูปแบบ"
          : "สิทธิ์ปัจจุบัน: Operator — จำกัดสิทธิ์เฉพาะคูปอง ข่าวสาร และ Monitor เท่านั้น",
        walletSearch: st.walletSearch,
        onWalletSearch: setVal("walletSearch"),
        openAddPay: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "pay_edit",
            modalErr: "",
            peEditId: "",
            peMemberId: "mb1",
            peMemberName: waMember.name,
            peAmount: "500",
            peType: "เติมเงิน Wallet (ไม่เข้า)",
            peChannel: "KBank K-Plus · Slip",
            peStatus: "pending",
            peDate: this.todayIso(),
            peTaxName: waMember.name,
            peTaxId: waMember.taxId || "",
            peNote: "",
          });
        },
        openPayCfg: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "pay_cfg",
            modalErr: "",
            pcCompany: payCfg.company,
            pcTaxId: payCfg.taxId,
            pcAddr: payCfg.addr,
            pcBankName: payCfg.bankName,
            pcBankAcc: payCfg.bankAcc,
            pcGateway: payCfg.gateway,
            pcMerchantId: payCfg.merchantId,
            pcCycle: payCfg.cycle,
          });
        },
        reconcileGateway: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          let seq = 1;
          const next = gwBatches.map((g) =>
            g.verifyStatus === "matched"
              ? g
              : Object.assign({}, g, {
                  verifyStatus: "matched",
                  bankRef: "โอนแล้ว · อ้างอิง KB-9980" + seq++,
                }),
          );
          this.saveStore("cx-bo-gw-batches", next);
          this.setState({ gwBatches: next });
          fireToast("กระทบยอดเงินเข้าบัญชีบริษัทครบทุกรายการแล้ว");
        },
        showPayEdit: isSuper && st.modal === "pay_edit",
        peModalTitle: st.peEditId
          ? "แก้ไขรายการชำระเงินและสถานะ"
          : "เพิ่มรายการชำระเงิน / เติมเงินไม่เข้า",
        peMemberName: st.peMemberName,
        peAmount: st.peAmount,
        peChannel: st.peChannel,
        peDate: st.peDate,
        peTaxName: st.peTaxName,
        peTaxId: st.peTaxId,
        peNote: st.peNote,
        onPeMemberName: setVal("peMemberName"),
        onPeAmount: setVal("peAmount"),
        onPeChannel: setVal("peChannel"),
        onPeTaxName: setVal("peTaxName"),
        onPeTaxId: setVal("peTaxId"),
        onPeNote: setVal("peNote"),
        onPeDate: (e) =>
          this.setState({
            peDate: e && e.target ? e.target.value : this.todayIso(),
            modalErr: "",
          }),
        peTypeBtns: [
          "เติมเงิน Wallet (ไม่เข้า)",
          "ค่าชาร์จ EV",
          "แพ็กเกจ Membership",
        ].map((tp) => ({
          label: tp,
          pick: () => this.setState({ peType: tp, modalErr: "" }),
          style: nwBtnStyle(st.peType === tp),
        })),
        peStatBtns: [
          ["paid", "ชำระสำเร็จ"],
          ["pending", "รอตรวจสอบสลิป"],
          ["failed", "ตัดเงินไม่สำเร็จ"],
          ["refunded", "คืนเงินแล้ว"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ peStatus: id, modalErr: "" }),
          style: nwBtnStyle(st.peStatus === id),
        })),
        savePayEdit: () => {
          if (!isSuper) return;
          const memberName = String(st.peMemberName || "").trim();
          const amt = Number(parseFloat(st.peAmount));
          if (!memberName || isNaN(amt) || amt <= 0) {
            this.setState({
              modalErr: "กรุณากรอกชื่อผู้ชำระและจำนวนเงินให้ถูกต้อง",
            });
            return;
          }
          const isEdit = !!st.peEditId;
          const fields = {
            memberName,
            amount: +amt.toFixed(2),
            type: st.peType || "ค่าชาร์จ EV",
            channel:
              String(st.peChannel || "").trim() || "PromptPay QR · Omise",
            status: st.peStatus || "pending",
            dateIso: String(st.peDate || "").trim() || this.todayIso(),
            taxName: String(st.peTaxName || "").trim() || memberName,
            taxId: String(st.peTaxId || "").trim(),
            note: String(st.peNote || "").trim() || st.peType || "ค่าชาร์จ EV",
          };
          let next;
          if (isEdit) {
            next = payList.map((x) =>
              x.id === st.peEditId ? Object.assign({}, x, fields) : x,
            );
          } else {
            const rec = Object.assign(
              {
                id: "PAY-" + String(Date.now()).slice(-6),
                memberId: st.peMemberId || "mb1",
                memberMeta: "Back Office Entry",
                slipImg: "",
                slipFileName: "",
                slipMime: "",
              },
              fields,
            );
            next = [rec].concat(payList);
          }
          this.saveStore("cx-bo-payments", next);
          this.setState({
            payments: next,
            modal: "",
            peEditId: "",
            modalErr: "",
          });
          fireToast(
            isEdit
              ? "บันทึกการแก้ไขรายการชำระเงินแล้ว"
              : "เพิ่มรายการชำระเงินเรียบร้อยแล้ว",
          );
        },
        showPaySlip: isSuper && st.modal === "pay_slip",
        slipTargetInfo:
          slipPay.id +
          " · " +
          slipPay.memberName +
          " (฿" +
          this.fmtNum(slipPay.amount, 2) +
          ")",
        hasSlipPreview: !!st.slipPreview,
        noSlipPreview: !st.slipPreview,
        slipPreview: st.slipPreview || "",
        slipFileInfo: st.slipPreview
          ? st.slipFileName + " (" + (st.slipMime || "image/png") + ")"
          : "รายการนี้ยังไม่แนบไฟล์",
        useSamplePngSlip: () => {
          const s = this.sampleSlipDataUri("png");
          this.setState({
            slipPreview: s.url,
            slipFileName: "kplus-slip-500.png",
            slipMime: s.mime,
            modalErr: "",
          });
        },
        useSampleJpgSlip: () => {
          const s = this.sampleSlipDataUri("jpg");
          this.setState({
            slipPreview: s.url,
            slipFileName: "bank-slip-500.jpg",
            slipMime: s.mime,
            modalErr: "",
          });
        },
        onSlipFile: (e) => {
          if (!isSuper) return;
          const f = e && e.target && e.target.files && e.target.files[0];
          if (!f) return;
          const fn = String(f.name || "");
          const tp = String(f.type || "").toLowerCase();
          const isJpgPng =
            tp === "image/jpeg" ||
            tp === "image/png" ||
            /\.(jpe?g|png)$/i.test(fn);
          if (!isJpgPng) {
            this.setState({
              modalErr:
                "รองรับเฉพาะไฟล์ภาพ JPEG (.jpg/.jpeg) หรือ PNG (.png) เท่านั้น",
            });
            return;
          }
          const normMime =
            tp === "image/png" || /\.png$/i.test(fn)
              ? "image/png"
              : "image/jpeg";
          if (typeof FileReader !== "undefined") {
            const r = new FileReader();
            r.onload = () => {
              if (typeof r.result === "string" && r.result) {
                this.setState({
                  slipPreview: r.result,
                  slipFileName: fn || "slip.png",
                  slipMime: normMime,
                  modalErr: "",
                });
                fireToast("อัปโหลดไฟล์สลิปเข้าสู่รายการแล้ว");
              }
            };
            r.onerror = () =>
              this.setState({ modalErr: "ไม่สามารถอ่านไฟล์รูปภาพได้" });
            r.readAsDataURL(f);
          } else {
            const s = this.sampleSlipDataUri(
              normMime === "image/jpeg" ? "jpg" : "png",
            );
            this.setState({
              slipPreview: s.url,
              slipFileName: fn || "slip.jpg",
              slipMime: normMime,
              modalErr: "",
            });
            fireToast("อัปโหลดไฟล์สลิปเข้าสู่รายการแล้ว");
          }
        },
        saveSlipOnly: () => {
          if (!isSuper) return;
          if (!st.slipPreview) {
            this.setState({
              modalErr: "กรุณาอัปโหลดหลักฐาน JPEG หรือ PNG ก่อนอนุมัติเติมเงิน",
            });
            return;
          }
          const next = payList.map((p) =>
            p.id === slipPay.id
              ? Object.assign({}, p, {
                  slipImg: st.slipPreview,
                  slipFileName: st.slipFileName,
                  slipMime: st.slipMime,
                })
              : p,
          );
          this.saveStore("cx-bo-payments", next);
          this.setState({ payments: next, modal: "", modalErr: "" });
          fireToast("บันทึกหลักฐานสลิปเรียบร้อยแล้ว");
        },
        approveSlipAndCredit: () => {
          if (!isSuper) return;
          if (!st.slipPreview) {
            this.setState({
              modalErr: "กรุณาอัปโหลดหลักฐาน JPEG หรือ PNG ก่อนอนุมัติเติมเงิน",
            });
            return;
          }
          const amt = Number(slipPay.amount) || 0;
          const nextPays = payList.map((p) =>
            p.id === slipPay.id
              ? Object.assign({}, p, {
                  status: "paid",
                  slipImg: st.slipPreview,
                  slipFileName: st.slipFileName,
                  slipMime: st.slipMime,
                  note:
                    "เติมเงินจากสลิป Back Office · " +
                    (st.slipFileName || "slip.png"),
                })
              : p,
          );
          const nextMembers = membersSrc.map((m) => {
            if (m.id !== slipPay.memberId) return m;
            const nb = +(Number(m.wallet || 0) + amt).toFixed(2);
            syncMemberWalletToApp(
              m.id,
              nb,
              "เติมเงินจากสลิป Back Office",
              amt,
              true,
            );
            return Object.assign({}, m, { wallet: nb });
          });
          this.saveStore("cx-bo-payments", nextPays);
          this.saveStore("cx-bo-members", nextMembers);
          this.setState({
            payments: nextPays,
            members: nextMembers,
            modal: "",
            modalErr: "",
          });
          fireToast("อนุมัติสลิปและเติมเงินเข้า Wallet สำเร็จแล้ว");
        },
        showPayCfg: isSuper && st.modal === "pay_cfg",
        pcCompany: st.pcCompany,
        pcTaxId: st.pcTaxId,
        pcAddr: st.pcAddr,
        pcBankName: st.pcBankName,
        pcBankAcc: st.pcBankAcc,
        pcGateway: st.pcGateway,
        pcMerchantId: st.pcMerchantId,
        pcCycle: st.pcCycle,
        onPcCompany: setVal("pcCompany"),
        onPcTaxId: setVal("pcTaxId"),
        onPcAddr: setVal("pcAddr"),
        onPcBankName: setVal("pcBankName"),
        onPcBankAcc: setVal("pcBankAcc"),
        onPcGateway: setVal("pcGateway"),
        onPcMerchantId: setVal("pcMerchantId"),
        onPcCycle: setVal("pcCycle"),
        savePayCfg: () => {
          if (!isSuper) return;
          const company = String(st.pcCompany || "").trim();
          const taxId = String(st.pcTaxId || "").trim();
          const bankName = String(st.pcBankName || "").trim();
          const bankAcc = String(st.pcBankAcc || "").trim();
          if (!company || !taxId || !bankName || !bankAcc) {
            this.setState({
              modalErr:
                "กรุณากรอกข้อมูลบริษัท เลขผู้เสียภาษี และบัญชีธนาคารให้ครบถ้วน",
            });
            return;
          }
          const nextCfg = {
            company,
            taxId,
            addr: String(st.pcAddr || "").trim() || payCfg.addr,
            bankName,
            bankAcc,
            bankHolder: company,
            gateway: String(st.pcGateway || "").trim() || payCfg.gateway,
            merchantId:
              String(st.pcMerchantId || "").trim() || payCfg.merchantId,
            cycle: String(st.pcCycle || "").trim() || payCfg.cycle,
          };
          this.saveStore("cx-bo-pay-cfg", nextCfg);
          this.setState({ payCfg: nextCfg, modal: "", modalErr: "" });
          fireToast("บันทึกข้อมูลชำระเงินบริษัทเรียบร้อยแล้ว");
        },
        showPayDoc: isSuper && st.modal === "pay_doc",
        docInvBtnStyle: nwBtnStyle(!docIsTax),
        docTaxBtnStyle: nwBtnStyle(docIsTax),
        switchDocInv: () => this.setState({ docType: "inv" }),
        switchDocTax: () => this.setState({ docType: "tax" }),
        docTitle: docIsTax
          ? "ใบเสร็จรับเงิน / ใบกำกับภาษี"
          : "ใบแจ้งหนี้ (Invoice)",
        docSellerLine: payCfg.company + " · " + payCfg.taxId,
        docSellerAddr: payCfg.addr,
        docNo:
          "เอกสารเลขที่ " +
          (docIsTax ? "TAX-" : "INV-") +
          String(docPay.id || "01").replace("PAY-", ""),
        docDateText: this.fmtThaiDate(this.parseIso(docPay.dateIso), true),
        docStatText: payStatMeta(docPay.status)[0],
        docBuyerName: docPay.taxName || docPay.memberName,
        docBuyerTax: "เลขประจำตัวผู้เสียภาษี: " + (docPay.taxId || "—"),
        docItemDesc: docPay.type + " (" + docPay.channel + ")",
        docSubTotal: "฿" + this.fmtNum(docSubNum, 2),
        docVat: "฿" + this.fmtNum(docVatNum, 2),
        docGrandTotal: "฿" + this.fmtNum(docAmtNum, 2),
        printPayDoc: () => {
          if (!isSuper) return;
          const html = this.buildPayDocHtml(
            docPay,
            st.docType || "tax",
            payCfg,
          );
          this._lastPayDocHtml = html;
          try {
            if (typeof document !== "undefined" && document.createElement) {
              const fr = document.createElement("iframe");
              fr.style.cssText =
                "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
              document.body.appendChild(fr);
              const doc =
                fr.contentDocument ||
                (fr.contentWindow && fr.contentWindow.document);
              if (doc) {
                doc.open();
                doc.write(html);
                doc.close();
                setTimeout(() => {
                  try {
                    if (fr.contentWindow) {
                      fr.contentWindow.focus();
                      fr.contentWindow.print();
                    }
                  } catch (e) {}
                  setTimeout(() => {
                    try {
                      if (fr.parentNode) fr.parentNode.removeChild(fr);
                    } catch (e) {}
                  }, 1000);
                }, 120);
              }
            }
          } catch (er) {}
          fireToast("เปิดหน้าต่างออกเอกสารเรียบร้อยแล้ว");
        },
        showWalletAdj: isSuper && st.modal === "wallet_adj",
        waMemberName: waMember.name,
        waMemberSummary:
          waMember.email + " · " + (waMember.userRole || "ผู้ใช้ทั่วไป"),
        waCurBal: "฿" + this.fmtNum(waMember.wallet, 2),
        waAmount: st.waAmount,
        waReason: st.waReason,
        onWaAmount: setVal("waAmount"),
        onWaReason: setVal("waReason"),
        waRoleBtns: ["ผู้ใช้ทั่วไป", "สมาชิก VIP", "องค์กร / Fleet"].map(
          (r) => ({
            label: r,
            pick: () => this.setState({ waRole: r, modalErr: "" }),
            style: nwBtnStyle(st.waRole === r),
          }),
        ),
        waModeBtns: [
          ["credit", "เติมเงิน (+)"],
          ["debit", "หักเงิน / ปรับลด (-)"],
          ["settle", "ชำระยอดค้างตัดไม่ได้"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ waMode: id, modalErr: "" }),
          style: nwBtnStyle(st.waMode === id),
        })),
        waStatBtns: [
          ["active", "ใช้งานปกติ"],
          ["suspended", "ระงับชั่วคราว"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ waStatus: id, modalErr: "" }),
          style: nwBtnStyle(
            (st.waStatus === "suspended" ? "suspended" : "active") === id,
          ),
        })),
        saveWalletAdj: () => {
          if (!isSuper) return;
          const amt = Math.max(0, Number(parseFloat(st.waAmount)) || 0);
          const mode = st.waMode || "credit";
          const curBal = Number(waMember.wallet) || 0;
          const curDebt = Number(waMember.uncollected) || 0;
          const roleChanged =
            (waMember.userRole || "ผู้ใช้ทั่วไป") !== st.waRole;
          const statChanged =
            (waMember.walletStatus || "active") !== st.waStatus;
          if (mode === "settle" && curDebt <= 0) {
            this.setState({ modalErr: "ผู้ใช้ไม่มีรายการค้างชำระ" });
            return;
          }
          if (mode === "debit" && amt > curBal) {
            this.setState({ modalErr: "ยอดเงินใน Wallet ไม่พอสำหรับหักยอด" });
            return;
          }
          if (mode !== "settle" && amt <= 0 && !roleChanged && !statChanged) {
            this.setState({
              modalErr:
                "กรุณาระบุจำนวนเงินมากกว่า 0 หรือแก้ไขสิทธิ์ Role / สถานะ",
            });
            return;
          }
          let nb = curBal,
            nd = curDebt;
          if (mode === "credit") nb = +(curBal + amt).toFixed(2);
          else if (mode === "debit") nb = +(curBal - amt).toFixed(2);
          else if (mode === "settle") {
            const payD = amt > 0 ? Math.min(curDebt, amt) : curDebt;
            nd = +(curDebt - payD).toFixed(2);
          }
          const nextMembers = membersSrc.map((m) =>
            m.id === waMember.id
              ? Object.assign({}, m, {
                  wallet: nb,
                  uncollected: nd,
                  userRole: st.waRole || m.userRole,
                  walletStatus: st.waStatus || "active",
                })
              : m,
          );
          this.saveStore("cx-bo-members", nextMembers);
          if (amt > 0 && (mode === "credit" || mode === "debit")) {
            syncMemberWalletToApp(
              waMember.id,
              nb,
              String(st.waReason || "").trim() || "ปรับยอดโดย Super Admin",
              amt,
              mode === "credit",
            );
          }
          this.setState({ members: nextMembers, modal: "", modalErr: "" });
          fireToast("อัปเดตกระเป๋าเงินและ User Role แล้ว");
        },
        hasToastUndo: !!(
          st.nwUndo ||
          st.tutUndo ||
          st.cpUndo ||
          st.stUndo ||
          st.umUndo ||
          st.catUndo
        ),
        umSearch: st.umSearch,
        onUmSearch: setVal("umSearch"),
        umCountBadge:
          "แสดง " + umRows.length + " / " + allUmPool.length + " บัญชี",
        umTypeFilters,
        umRoleFilters,
        umStatFilters,
        umTeamFilters,
        umDropBtns,
        umSectionBtns,
        umRows,
        noUmMatch: umRows.length === 0,
        showUmUsers: umSec === "users",
        showUmRoles: umSec === "roles",
        showUmTeams: umSec === "teams",
        hasOpenUmDrop: ["type", "role", "stat"].indexOf(st.umDrop) >= 0,
        closeUmDrop: () => this.setState({ umDrop: "" }),
        umDropPopStyle:
          "position: fixed; top: " +
          (st.umDropTop || 260) +
          "px; left: " +
          (st.umDropLeft || 320) +
          "px; z-index: 65; width: 256px; max-height: 280px; overflow-y: auto; padding: 6px; border-radius: 14px; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 16px 36px rgba(15,23,42,0.18); display: flex; flex-direction: column; gap: 2px",
        umDropTitle:
          st.umDrop === "type"
            ? "เลือกประเภทผู้ใช้งาน"
            : st.umDrop === "role"
              ? "เลือกบทบาท (Role)"
              : "เลือกสถานะบัญชี",
        umDropOpts:
          st.umDrop === "type"
            ? umTypeFilters
            : st.umDrop === "role"
              ? umRoleFilters
              : umStatFilters,
        umActiveChips: (() => {
          const chips = [];
          if (String(st.umSearch || "").trim())
            chips.push({
              label: "ค้นหา: " + String(st.umSearch).trim(),
              clear: () => this.setState({ umSearch: "" }),
            });
          if ((st.umTypeFilter || "all") !== "all") {
            const lb =
              (umTypeFilters.find((x) => x.id === st.umTypeFilter) || {})
                .label || st.umTypeFilter;
            chips.push({
              label: "ประเภท: " + lb,
              clear: () => this.setState({ umTypeFilter: "all" }),
            });
          }
          if ((st.umRoleFilter || "all") !== "all") {
            const lb =
              (umRoleFilters.find((x) => x.id === st.umRoleFilter) || {})
                .label || st.umRoleFilter;
            chips.push({
              label: "บทบาท: " + lb,
              clear: () => this.setState({ umRoleFilter: "all" }),
            });
          }
          if ((st.umStatFilter || "all") !== "all") {
            const lb =
              (umStatFilters.find((x) => x.id === st.umStatFilter) || {})
                .label || st.umStatFilter;
            chips.push({
              label: "สถานะ: " + lb,
              clear: () => this.setState({ umStatFilter: "all" }),
            });
          }
          if ((st.umTeamFilter || "all") !== "all") {
            chips.push({
              label: "กลุ่มทีม: " + st.umTeamFilter,
              clear: () => this.setState({ umTeamFilter: "all" }),
            });
          }
          return chips;
        })(),
        hasUmActiveChips:
          !!String(st.umSearch || "").trim() ||
          (st.umTypeFilter || "all") !== "all" ||
          (st.umRoleFilter || "all") !== "all" ||
          (st.umStatFilter || "all") !== "all" ||
          (st.umTeamFilter || "all") !== "all",
        hasOpenUmMenu: !!allUmPool.find((u) => u.id === st.umMenuId),
        activeUmMenu: allUmPool.find((u) => u.id === st.umMenuId) || {
          id: "",
          name: "",
          email: "",
          isOwner: true,
          canEdit: false,
          canShowDel: false,
          view: () => {},
          edit: () => {},
          editPw: () => {},
          openAssignTeam: () => {},
          askDel: () => {},
          del: () => {},
        },
        closeUmMenu: () => this.setState({ umMenuId: "" }),
        umMenuPopStyle:
          "position: fixed; top: " +
          (st.umMenuTop || 260) +
          "px; right: " +
          (st.umMenuRight || 44) +
          "px; z-index: 65; width: 232px; padding: 6px; border-radius: 14px; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 16px 36px rgba(15,23,42,0.18); display: flex; flex-direction: column; gap: 2px; text-align: left",
        umRoleRows,
        umTeamRows,
        umRoleMatrixTabs,
        umMatrixRows,
        umMatrixRoleName: matrixRoleObj ? matrixRoleObj.name : "Operator",
        umMatrixIsLocked: matrixRoleIsSup,
        resetUmFilters: () => {
          this.setState({
            umSearch: "",
            umTypeFilter: "all",
            umRoleFilter: "all",
            umStatFilter: "all",
            umTeamFilter: "all",
            umDrop: "",
          });
          fireToast("ล้างตัวกรอง");
        },
        openAddUmUser: () => {
          if (!canView("operators")) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "um_user",
            modalErr: "",
            umEditId: "",
            umEditKind: "admin",
            umFormType: "admin",
            umMenuId: "",
            umName: "",
            umEmail: "",
            umPhone: "",
            umDept: "Station Operations",
            umRoleId: "role_op",
            umTeam: "Operations & Marketing",
            umPerms: ["coupons", "news", "monitor"],
            umStatus: "active",
            umPw: "",
            umPw2: "",
          });
        },
        showUmUserModal: canView("operators") && st.modal === "um_user",
        umModalTitle: st.umEditId
          ? "แก้ไขข้อมูลผู้ใช้งานระบบ"
          : "เพิ่มผู้ใช้งานระบบใหม่",
        umSaveBtn: "บันทึกข้อมูลผู้ใช้งาน",
        umIsEdit: !!st.umEditId,
        umCanPickType: !st.umEditId,
        umIsAdminType,
        umSupLockAlert,
        umFormTypeBtns,
        umFormRoleBtns,
        umFormTeamBtns,
        umFormPermBtns,
        umFormStatBtns,
        umName: st.umName,
        onUmName: setVal("umName"),
        umEmail: st.umEmail,
        onUmEmail: setVal("umEmail"),
        umPhone: st.umPhone,
        onUmPhone: setVal("umPhone"),
        umDept: st.umDept,
        onUmDept: setVal("umDept"),
        umPw: st.umPw,
        onUmPw: setVal("umPw"),
        umPw2: st.umPw2 || "",
        onUmPw2: setVal("umPw2"),
        umFormPwRules: pwRules(st.umPw),
        ...(() => {
          const pw = String(st.umPw || "");
          const pw2 = String(st.umPw2 || "");
          const r = this.checkPw(pw);
          const sc = ["len", "upper", "lower", "digit", "sym"].filter(
            (k) => r[k],
          ).length;
          const pct = sc * 20;
          const fg = sc <= 2 ? "#B42318" : sc <= 4 ? "#B86A00" : "#146C3E";
          const lbl = !pw
            ? "กรอกรหัสผ่านเพื่อประเมินความปลอดภัย"
            : sc <= 2
              ? "ความแข็งแรง: ต่ำ"
              : sc <= 4
                ? "ความแข็งแรง: ปานกลาง"
                : "ความแข็งแรง: สูง (ผ่านเกณฑ์)";
          const em = String(st.umEmail || "")
            .trim()
            .toLowerCase();
          const isEd = !!st.umEditId;
          const knd = isEd
            ? st.umEditKind || "admin"
            : st.umFormType || "admin";
          const pkR = rolesList.find((x) => x.id === st.umRoleId);
          const isSupPick = pkR && pkR.baseRole === "super_admin";
          let emMsg = "",
            emOk = false;
          if (em) {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))
              emMsg = "รูปแบบอีเมลไม่ถูกต้อง (ตัวอย่าง name@chargex.co.th)";
            else if (knd === "admin" && !isSupPick && !this.isCorpEmail(em))
              emMsg = "Operator ต้องใช้อีเมลบริษัท (@chargex.co.th) เท่านั้น";
            else if (
              (knd === "admin" &&
                st.users.some(
                  (x) =>
                    x.email.toLowerCase() === em &&
                    (!isEd || x.id !== st.umEditId),
                )) ||
              (knd === "member" &&
                (st.members || []).some(
                  (x) =>
                    String(x.email || "").toLowerCase() === em &&
                    (!isEd || x.id !== st.umEditId),
                ))
            )
              emMsg = "อีเมลนี้ถูกใช้งานในระบบแล้ว";
            else {
              emOk = true;
              emMsg =
                knd === "admin"
                  ? "✓ อีเมลองค์กรถูกต้องพร้อมใช้งาน"
                  : "✓ อีเมลถูกต้องพร้อมใช้งาน";
            }
          }
          const hasPwM = !!pw && (pw2.length > 0 || !isEd);
          const pwMatch = pw === pw2 && !!pw2;
          return {
            hasUmEmailHint: !!emMsg,
            umEmailHintText: emMsg,
            umEmailHintStyle:
              "font-size: 12px; font-weight: 600; color: " +
              (emOk ? "#146C3E" : "#B42318"),
            umPwMeterLabel: lbl,
            umPwMeterFg: fg,
            umPwMeterBarStyle:
              "height: 100%; border-radius: 999px; width: " +
              pct +
              "%; background: " +
              fg,
            hasUmPwMatchHint: hasPwM && !!pw2,
            umPwMatchText: pwMatch
              ? "✓ รหัสผ่านทั้งสองช่องตรงกัน"
              : "รหัสผ่านทั้งสองช่องไม่ตรงกัน",
            umPwMatchStyle:
              "font-size: 12px; font-weight: 600; color: " +
              (pwMatch ? "#146C3E" : "#B42318"),
          };
        })(),
        genUmFormPw: () => {
          const p = "Cx@" + Math.floor(10000 + Math.random() * 89999) + "a!";
          this.setState({ umPw: p, umPw2: p, modalErr: "" });
        },
        saveUmUser: () => {
          if (!canView("operators")) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const nm = String(st.umName || "").trim();
          const em = String(st.umEmail || "")
            .trim()
            .toLowerCase();
          const ph = String(st.umPhone || "").trim();
          const dp = String(st.umDept || "").trim();
          const pw = String(st.umPw || "");
          const pw2 = String(st.umPw2 || "");
          const isEdit = !!st.umEditId;
          const kind = isEdit
            ? st.umEditKind || "admin"
            : st.umFormType || "admin";
          if (!nm || !em || !ph) {
            this.setState({ modalErr: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" });
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
            this.setState({ modalErr: "รูปแบบอีเมลไม่ถูกต้อง" });
            return;
          }
          if (kind === "admin") {
            const pickedRole =
              rolesList.find((r) => r.id === st.umRoleId) ||
              rolesList.find((r) => r.id === "role_op");
            const isPickedSup =
              pickedRole && pickedRole.baseRole === "super_admin";
            const editingExisting = isEdit
              ? st.users.find((x) => x.id === st.umEditId)
              : null;
            const isEditingSoleSuper =
              editingExisting && editingExisting.role === "super_admin";
            const supExistsOther = st.users.some(
              (x) =>
                x.role === "super_admin" && (!isEdit || x.id !== st.umEditId),
            );
            if (isPickedSup && supExistsOther) {
              this.setState({
                modalErr:
                  "ไม่สามารถกำหนดบทบาท Super Admin เพิ่มได้ เนื่องจากระบบจำกัดไว้ที่ 1 User ID เท่านั้น",
              });
              return;
            }
            if (isEditingSoleSuper && !isPickedSup) {
              this.setState({
                modalErr: "ไม่สามารถเปลี่ยนสิทธิ์ของบัญชี Super Admin หลักได้",
              });
              return;
            }
            if (!isPickedSup && !this.isCorpEmail(em)) {
              this.setState({
                modalErr:
                  "Operator ต้องใช้อีเมลบริษัท (@chargex.co.th) เท่านั้น",
              });
              return;
            }
            if (
              st.users.some(
                (x) =>
                  x.email.toLowerCase() === em &&
                  (!isEdit || x.id !== st.umEditId),
              )
            ) {
              this.setState({ modalErr: "อีเมลนี้ถูกใช้งานในระบบแล้ว" });
              return;
            }
            if ((!isEdit || pw) && !this.checkPw(pw).ok) {
              this.setState({
                modalErr:
                  "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
              });
              return;
            }
            if ((!isEdit || pw) && pw !== pw2) {
              this.setState({ modalErr: "รหัสผ่านทั้งสองช่องไม่ตรงกัน" });
              return;
            }
            const perms = isPickedSup
              ? permDefs.map((p) => p[0])
              : Array.isArray(st.umPerms) && st.umPerms.length
                ? st.umPerms.slice()
                : ["coupons", "news", "monitor"];
            const team =
              String(st.umTeam || "").trim() || "Operations & Marketing";
            const nextStat = isEditingSoleSuper
              ? "active"
              : st.umStatus === "inactive"
                ? "inactive"
                : "active";
            let next;
            if (isEdit) {
              next = st.users.map((x) =>
                x.id === st.umEditId
                  ? Object.assign({}, x, {
                      name: nm,
                      email: em,
                      username: isEditingSoleSuper ? x.username : em,
                      phone: ph,
                      dept: dp || "Back Office",
                      role: isPickedSup ? "super_admin" : "operator",
                      roleId: pickedRole ? pickedRole.id : "role_op",
                      roleName: pickedRole ? pickedRole.name : "Operator",
                      team,
                      perms,
                      status: nextStat,
                      password: pw || x.password,
                    })
                  : x,
              );
            } else {
              const rec = {
                id: "op_" + Date.now(),
                role: "operator",
                roleId: pickedRole ? pickedRole.id : "role_op",
                roleName: pickedRole ? pickedRole.name : "Operator",
                username: em,
                email: em,
                name: nm,
                phone: ph,
                dept: dp || "Station Operations",
                team,
                perms,
                status: nextStat,
                password: pw,
                lastLogin: "ยังไม่เคยเข้าใช้",
              };
              next = st.users.concat([rec]);
            }
            this.saveStore("cx-bo-users", next);
            this.setState({
              users: next,
              modal: "",
              umEditId: "",
              umPw: "",
              umPw2: "",
              modalErr: "",
            });
            fireToast(
              isEdit
                ? "บันทึกการแก้ไขข้อมูลผู้ใช้งานแล้ว"
                : "สร้างบัญชีผู้ใช้งานเรียบร้อยแล้ว",
            );
          } else {
            const rawM =
              st.members && st.members.length ? st.members : this.seedMembers();
            if (
              rawM.some(
                (m) =>
                  String(m.email || "").toLowerCase() === em &&
                  (!isEdit || m.id !== st.umEditId),
              )
            ) {
              this.setState({ modalErr: "อีเมลนี้ถูกใช้งานในระบบแล้ว" });
              return;
            }
            if ((!isEdit || pw) && !this.checkPw(pw).ok) {
              this.setState({
                modalErr:
                  "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
              });
              return;
            }
            if ((!isEdit || pw) && pw !== pw2) {
              this.setState({ modalErr: "รหัสผ่านทั้งสองช่องไม่ตรงกัน" });
              return;
            }
            const ur =
              ["ผู้ใช้ทั่วไป", "สมาชิก VIP", "องค์กร / Fleet"].indexOf(
                st.umRoleId,
              ) >= 0
                ? st.umRoleId
                : "ผู้ใช้ทั่วไป";
            const team =
              String(st.umTeam || "").trim() || "EV Driver & Fleet Group";
            const stat = st.umStatus === "inactive" ? "inactive" : "active";
            let nextM;
            if (isEdit) {
              nextM = rawM.map((m) =>
                m.id === st.umEditId
                  ? Object.assign({}, m, {
                      name: nm,
                      email: em,
                      phone: ph,
                      car: dp || m.car || "BYD Atto 3",
                      userRole: ur,
                      team,
                      status: stat,
                      walletStatus: stat === "active" ? "active" : "suspended",
                      password: pw || m.password,
                    })
                  : m,
              );
            } else {
              const recM = {
                id: "mb_" + Date.now(),
                name: nm,
                email: em,
                phone: ph,
                car: dp || "BYD Atto 3",
                joinedIso: this.todayIso(),
                joinedLabel: this.fmtThaiDate(
                  this.parseIso(this.todayIso()),
                  true,
                ),
                sessions: 0,
                kwh: 0,
                wallet: 0,
                uncollected: 0,
                userRole: ur,
                team,
                status: stat,
                walletStatus: stat === "active" ? "active" : "suspended",
                taxId: "",
                password: pw,
              };
              nextM = [recM].concat(rawM);
            }
            this.saveStore("cx-bo-members", nextM);
            this.setState({
              members: nextM,
              modal: "",
              umEditId: "",
              umPw: "",
              umPw2: "",
              modalErr: "",
            });
            fireToast(
              isEdit
                ? "บันทึกการแก้ไขข้อมูลผู้ใช้งานแล้ว"
                : "สร้างบัญชีผู้ใช้งานเรียบร้อยแล้ว",
            );
          }
        },
        showUmDetailModal: canView("operators") && st.modal === "um_detail",
        umDet: umDetObj,
        editUmFromDet: () => {
          if (umDetObj && umDetObj.edit) umDetObj.edit();
        },
        pwUmFromDet: () => {
          if (umDetObj && umDetObj.editPw) umDetObj.editPw();
        },
        showUmPwModal: canView("operators") && st.modal === "um_pw",
        umPwTargetName: umPwTargetObj ? umPwTargetObj.name : "",
        umPwTargetEmail: umPwTargetObj ? umPwTargetObj.email : "",
        umNewPw: st.umNewPw,
        onUmNewPw: setVal("umNewPw"),
        umNewPw2: st.umNewPw2,
        onUmNewPw2: setVal("umNewPw2"),
        umResetPwRules: pwRules(st.umNewPw),
        genUmResetPw: () => {
          const p = "Cx@" + Math.floor(10000 + Math.random() * 89999) + "p!";
          this.setState({ umNewPw: p, umNewPw2: p, modalErr: "" });
        },
        saveUmUserPw: () => {
          if (!canView("operators")) return;
          const p1 = String(st.umNewPw || "");
          const p2 = String(st.umNewPw2 || "");
          if (!this.checkPw(p1).ok) {
            this.setState({
              modalErr:
                "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
            });
            return;
          }
          if (p1 !== p2) {
            this.setState({ modalErr: "รหัสผ่านทั้งสองช่องไม่ตรงกัน" });
            return;
          }
          if (st.umPwTargetKind === "member") {
            const rawM =
              st.members && st.members.length ? st.members : this.seedMembers();
            const nextM = rawM.map((m) =>
              m.id === st.umPwTargetId
                ? Object.assign({}, m, { password: p1 })
                : m,
            );
            this.saveStore("cx-bo-members", nextM);
            this.setState({
              members: nextM,
              modal: "",
              umNewPw: "",
              umNewPw2: "",
              modalErr: "",
            });
          } else {
            const nextU = st.users.map((u) =>
              u.id === st.umPwTargetId
                ? Object.assign({}, u, { password: p1 })
                : u,
            );
            this.saveStore("cx-bo-users", nextU);
            this.setState({
              users: nextU,
              modal: "",
              umNewPw: "",
              umNewPw2: "",
              modalErr: "",
            });
          }
          fireToast("อัปเดตรหัสผ่านของผู้ใช้งานเรียบร้อยแล้ว");
        },
        ...(() => {
          const tgt = allUmPool.find((u) => u.id === st.umDelId) || null;
          const cf = String(st.umDelConfirm || "").trim();
          const ok = !!(
            tgt &&
            (cf === tgt.name ||
              cf.toLowerCase() === String(tgt.email || "").toLowerCase())
          );
          const ast = allUmPool.find((u) => u.id === st.umAssignTeamId) || null;
          return {
            showUmDelModal:
              canView("operators") && st.modal === "um_del" && !!tgt,
            umDelTargetName: tgt ? tgt.name : "",
            umDelTargetEmail: tgt ? tgt.email : "",
            umDelTargetMeta: tgt
              ? "ID: " + tgt.id + " · " + tgt.roleText + " · " + tgt.team
              : "",
            umDelConfirm: st.umDelConfirm || "",
            onUmDelConfirm: setVal("umDelConfirm"),
            umDelCanConfirm: ok,
            confirmDelUmUser: () => {
              if (!canView("operators") || !tgt) return;
              if (!ok) {
                this.setState({
                  modalErr:
                    "กรุณาพิมพ์ชื่อผู้ใช้งานหรืออีเมลให้ตรงกับบัญชีที่ต้องการลบ",
                });
                return;
              }
              deleteUmById(tgt.id, tgt.kind);
            },
            showUmAssignTeamModal:
              canView("operators") && st.modal === "um_assign_team" && !!ast,
            umAssignTargetName: ast ? ast.name : "",
            umAssignTargetEmail: ast ? ast.email : "",
            umAssignTeamBtns: teamsList.map((t) => ({
              label: t.name,
              pick: () =>
                this.setState({ umAssignTeamVal: t.name, modalErr: "" }),
              style: dBtnStyle(st.umAssignTeamVal === t.name),
            })),
            saveUmAssignTeam: () => {
              if (!canView("operators") || !ast) return;
              const nt = String(st.umAssignTeamVal || "").trim();
              if (!nt) {
                this.setState({ modalErr: "กรุณาเลือกกลุ่มผู้ใช้งาน" });
                return;
              }
              if (ast.kind === "member") {
                const rawM =
                  st.members && st.members.length
                    ? st.members
                    : this.seedMembers();
                const nextM = rawM.map((m) =>
                  m.id === ast.id ? Object.assign({}, m, { team: nt }) : m,
                );
                this.saveStore("cx-bo-members", nextM);
                this.setState({
                  members: nextM,
                  modal: "",
                  umAssignTeamId: "",
                  modalErr: "",
                });
              } else {
                const nextU = st.users.map((u) =>
                  u.id === ast.id ? Object.assign({}, u, { team: nt }) : u,
                );
                this.saveStore("cx-bo-users", nextU);
                this.setState({
                  users: nextU,
                  modal: "",
                  umAssignTeamId: "",
                  modalErr: "",
                });
              }
              fireToast('เปลี่ยนกลุ่มทีมของผู้ใช้งานเป็น "' + nt + '" แล้ว');
            },
          };
        })(),
        openAddRole: () => {
          if (!canView("operators")) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const defPerms = ["coupons", "news", "monitor"];
          this.setState({
            modal: "um_role",
            modalErr: "",
            roleEditId: "",
            roleReadOnly: false,
            roleName: "",
            roleDesc: "",
            rolePerms: defPerms,
            rolePermLevels: this.levelsFromPerms(defPerms, false),
          });
        },
        showRoleModal: canView("operators") && st.modal === "um_role",
        roleModalTitle: st.roleReadOnly
          ? "รายละเอียดบทบาทและสิทธิ์"
          : st.roleEditId
            ? "แก้ไขบทบาทผู้ใช้งาน"
            : "สร้างบทบาทผู้ใช้งานใหม่",
        roleBaseLabel:
          roleEditObj && roleEditObj.baseRole === "super_admin"
            ? "Super Admin — สงวนสิทธิ์ 1 User ID เท่านั้น (ล็อกเต็มระบบ)"
            : "Operator Tier (จำกัดระดับสูงสุดไม่เกิน Operator)",
        roleCanSave:
          !st.roleReadOnly &&
          !(roleEditObj && roleEditObj.baseRole === "super_admin"),
        roleName: st.roleName,
        onRoleName: setVal("roleName"),
        roleDesc: st.roleDesc,
        onRoleDesc: setVal("roleDesc"),
        rolePermBtns,
        roleModalMatrixRows,
        saveUmRole: () => {
          if (!canView("operators")) return;
          const rn = String(st.roleName || "").trim();
          const rd = String(st.roleDesc || "").trim();
          const rp = (Array.isArray(st.rolePerms) ? st.rolePerms : []).filter(
            (p) => permDefs.some((d) => d[0] === p),
          );
          if (!rn || !rd || !rp.length) {
            this.setState({
              modalErr:
                "กรุณาระบุชื่อบทบาท คำอธิบาย และเลือกสิทธิ์อย่างน้อย 1 สิทธิ์",
            });
            return;
          }
          const isEdit = !!st.roleEditId;
          const exist = isEdit
            ? rolesList.find((r) => r.id === st.roleEditId)
            : null;
          if (exist && exist.baseRole === "super_admin") {
            this.setState({
              modalErr: "ไม่สามารถเปลี่ยนสิทธิ์ของบัญชี Super Admin หลักได้",
            });
            return;
          }
          const nextLv = this.levelsFromPerms(rp, false, st.rolePermLevels);
          let nextR,
            nextU = st.users;
          if (isEdit && exist) {
            nextR = rolesList.map((r) =>
              r.id === exist.id
                ? Object.assign({}, r, {
                    name: rn,
                    desc: rd,
                    perms: rp,
                    permLevels: nextLv,
                  })
                : r,
            );
            nextU = st.users.map((u) =>
              u.roleId === exist.id
                ? Object.assign({}, u, { roleName: rn, perms: rp.slice() })
                : u,
            );
            this.saveStore("cx-bo-users", nextU);
          } else {
            const recR = {
              id: "role_" + Date.now(),
              name: rn,
              baseRole: "operator",
              desc: rd,
              perms: rp,
              permLevels: nextLv,
              systemLocked: false,
            };
            nextR = rolesList.concat([recR]);
          }
          this.saveStore("cx-bo-roles", nextR);
          this.setState({
            roles: nextR,
            users: nextU,
            modal: "",
            roleEditId: "",
            modalErr: "",
          });
          fireToast(
            isEdit
              ? "บันทึกการแก้ไขบทบาทแล้ว"
              : "เพิ่มบทบาทผู้ใช้งานเรียบร้อยแล้ว",
          );
        },
        openAddTeam: () => {
          if (!canView("operators")) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.setState({
            modal: "um_team",
            modalErr: "",
            tmEditId: "",
            tmModalTab: "info",
            tmName: "",
            tmDesc: "",
            tmLead: "",
            tmScope: "",
            tmMemberIds: [],
          });
        },
        showTeamModal: canView("operators") && st.modal === "um_team",
        teamModalTitle: st.tmEditId
          ? "จัดการกลุ่มทีม & สมาชิก (User Team)"
          : "สร้างกลุ่มผู้ใช้งานใหม่ (User Team)",
        tmModalTabBtns: [
          ["info", "ข้อมูลทีม & หัวหน้าทีม"],
          ["members", "จัดการสมาชิกในทีม (" + tmSelIds.length + ")"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ tmModalTab: id }),
          style: dBtnStyle((st.tmModalTab || "info") === id),
        })),
        showTmTabInfo: (st.tmModalTab || "info") === "info",
        showTmTabMembers: st.tmModalTab === "members",
        tmName: st.tmName,
        onTmName: setVal("tmName"),
        tmDesc: st.tmDesc,
        onTmDesc: setVal("tmDesc"),
        tmLead: st.tmLead || "",
        onTmLead: setVal("tmLead"),
        tmScope: st.tmScope || "",
        onTmScope: setVal("tmScope"),
        tmMemberChecks,
        saveUmTeam: () => {
          if (!canView("operators")) return;
          const tn = String(st.tmName || "").trim();
          const td = String(st.tmDesc || "").trim();
          const tl = String(st.tmLead || "").trim();
          const ts = String(st.tmScope || "").trim();
          if (!tn) {
            this.setState({ modalErr: "กรุณาระบุชื่อกลุ่มผู้ใช้งาน" });
            return;
          }
          const isEdit = !!st.tmEditId;
          const prevTeam = isEdit
            ? teamsList.find((t) => t.id === st.tmEditId)
            : null;
          let nextT;
          let nextU = st.users.slice();
          let nextM = (
            st.members && st.members.length ? st.members : this.seedMembers()
          ).slice();
          if (isEdit && prevTeam) {
            nextT = teamsList.map((t) =>
              t.id === prevTeam.id
                ? Object.assign({}, t, {
                    name: tn,
                    desc: td,
                    lead: tl || t.lead,
                    scope: ts || t.scope,
                  })
                : t,
            );
            if (prevTeam.name !== tn) {
              nextU = nextU.map((u) =>
                u.team === prevTeam.name
                  ? Object.assign({}, u, { team: tn })
                  : u,
              );
              nextM = nextM.map((m) =>
                m.team === prevTeam.name
                  ? Object.assign({}, m, { team: tn })
                  : m,
              );
            }
          } else {
            nextT = teamsList.concat([
              {
                id: "tm_" + Date.now(),
                name: tn,
                desc: td || tn,
                lead: tl || "ยังไม่ได้ระบุหัวหน้าทีม",
                scope: ts || td || "ทุกพื้นที่ที่รับผิดชอบ",
              },
            ]);
          }
          if (Array.isArray(st.tmMemberIds) && st.tmMemberIds.length) {
            nextU = nextU.map((u) =>
              st.tmMemberIds.indexOf(u.id) >= 0
                ? Object.assign({}, u, { team: tn })
                : u,
            );
            nextM = nextM.map((m) =>
              st.tmMemberIds.indexOf(m.id) >= 0
                ? Object.assign({}, m, { team: tn })
                : m,
            );
          }
          this.saveStore("cx-bo-users", nextU);
          this.saveStore("cx-bo-members", nextM);
          this.saveStore("cx-bo-teams", nextT);
          this.setState({
            teams: nextT,
            users: nextU,
            members: nextM,
            modal: "",
            tmEditId: "",
            modalErr: "",
          });
          fireToast(
            isEdit
              ? "บันทึกการแก้ไขกลุ่มทีมแล้ว"
              : "เพิ่มกลุ่มผู้ใช้งานเรียบร้อยแล้ว",
          );
        },
        openSelfModal: () => {
          if (!curUser) return;
          this.setState({
            modal: "self_account",
            modalErr: "",
            selfName: curUser.name || "",
            selfEmail: curUser.email || "",
            selfPhone: curUser.phone || "",
            selfDept: curUser.dept || "",
            selfPw: "",
            selfPw2: "",
            selfAvImg:
              curUser.avatar || this.avatarPresetUrl(isSuper ? "admin" : "op"),
          });
        },
        showSelfModal: !!curUser && st.modal === "self_account",
        selfTeam: curUser ? curUser.team || "Core Platform Team" : "",
        selfAvPreview:
          st.selfAvImg ||
          (curUser && curUser.avatar) ||
          this.avatarPresetUrl(isSuper ? "admin" : "op"),
        onSelfAvFile: (e) => {
          const f = e && e.target && e.target.files && e.target.files[0];
          if (!f) return;
          if (typeof FileReader !== "undefined") {
            const r = new FileReader();
            r.onload = () =>
              this.setState({
                selfAvImg: String(r.result || ""),
                modalErr: "",
              });
            r.onerror = () =>
              this.setState({ modalErr: "ไม่สามารถอ่านไฟล์รูปภาพได้" });
            r.readAsDataURL(f);
          }
        },
        selfAvPresets: [
          ["ชุดสีส้ม Charge X", "admin"],
          ["ชุดสีเขียว Eco", "green"],
          ["ชุดผู้ดูแลระบบ", "op"],
          ["ชุดเทคนิคสถานี", "tech"],
        ].map(([label, kind]) => {
          const src = this.avatarPresetUrl(kind);
          const on =
            String(st.selfAvImg || (curUser && curUser.avatar) || "") === src;
          return {
            label,
            pick: () => this.setState({ selfAvImg: src, modalErr: "" }),
            style:
              "height: 26px; padding: 0 9px; border-radius: 7px; font-family: inherit; font-size: 12.5px; font-weight: " +
              (on ? 700 : 600) +
              "; cursor: pointer; " +
              (on
                ? "border: 0; background: " + accent + "; color: #FFFFFF"
                : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
          };
        }),
        selfName: st.selfName,
        onSelfName: setVal("selfName"),
        selfEmail: st.selfEmail,
        onSelfEmail: setVal("selfEmail"),
        selfPhone: st.selfPhone,
        onSelfPhone: setVal("selfPhone"),
        selfDept: st.selfDept,
        onSelfDept: setVal("selfDept"),
        selfPw: st.selfPw,
        onSelfPw: setVal("selfPw"),
        selfPw2: st.selfPw2 || "",
        onSelfPw2: setVal("selfPw2"),
        selfPwRules: pwRules(st.selfPw),
        ...(() => {
          const spw = String(st.selfPw || "");
          const spw2 = String(st.selfPw2 || "");
          const sr = this.checkPw(spw);
          const sc = ["len", "upper", "lower", "digit", "sym"].filter(
            (k) => sr[k],
          ).length;
          const pct = sc * 20;
          const fg = sc <= 2 ? "#B42318" : sc <= 4 ? "#B86A00" : "#146C3E";
          const lbl = !spw
            ? "เว้นว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน"
            : sc <= 2
              ? "ความแข็งแรง: ต่ำ"
              : sc <= 4
                ? "ความแข็งแรง: ปานกลาง"
                : "ความแข็งแรง: สูง (ผ่านเกณฑ์)";
          return {
            selfPwMeterLabel: lbl,
            selfPwMeterFg: fg,
            selfPwMeterBarStyle:
              "height: 100%; border-radius: 999px; width: " +
              pct +
              "%; background: " +
              fg,
            hasSelfPwMatchHint: !!spw && !!spw2,
            selfPwMatchText:
              spw === spw2
                ? "✓ รหัสผ่านทั้งสองช่องตรงกัน"
                : "รหัสผ่านทั้งสองช่องไม่ตรงกัน",
            selfPwMatchStyle:
              "font-size: 12px; font-weight: 600; color: " +
              (spw === spw2 ? "#146C3E" : "#B42318"),
          };
        })(),
        saveSelfAccount: () => {
          if (!curUser) return;
          if (!isSuper && permPolicy.allowSelfProfileEdit === false) {
            this.setState({ modalErr: "ปิดสิทธิ์ชั่วคราว" });
            return;
          }
          const nm = String(st.selfName || "").trim();
          const em = String(st.selfEmail || "")
            .trim()
            .toLowerCase();
          const ph = String(st.selfPhone || "").trim();
          const dp = String(st.selfDept || "").trim();
          const pw = String(st.selfPw || "");
          const pw2 = String(st.selfPw2 || "");
          if (!nm || !em || !ph) {
            this.setState({ modalErr: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" });
            return;
          }
          if (
            !isSuper &&
            permPolicy.enforceCorpEmail !== false &&
            !this.isCorpEmail(em)
          ) {
            this.setState({
              modalErr: "Operator ต้องใช้อีเมลบริษัท (@chargex.co.th) เท่านั้น",
            });
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
            this.setState({ modalErr: "รูปแบบอีเมลไม่ถูกต้อง" });
            return;
          }
          if (
            st.users.some(
              (u) => u.id !== curUser.id && u.email.toLowerCase() === em,
            )
          ) {
            this.setState({ modalErr: "อีเมลนี้ถูกใช้งานในระบบแล้ว" });
            return;
          }
          if (pw && !this.checkPw(pw).ok) {
            this.setState({
              modalErr:
                "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
            });
            return;
          }
          if (pw && pw !== pw2) {
            this.setState({ modalErr: "รหัสผ่านทั้งสองช่องไม่ตรงกัน" });
            return;
          }
          const av = String(
            st.selfAvImg ||
              curUser.avatar ||
              this.avatarPresetUrl(isSuper ? "admin" : "op"),
          ).trim();
          const next = st.users.map((u) =>
            u.id === curUser.id
              ? Object.assign({}, u, {
                  name: nm,
                  email: em,
                  username: isSuper ? u.username : em,
                  phone: ph,
                  dept: dp || u.dept,
                  password: pw || u.password,
                  avatar: av,
                })
              : u,
          );
          this.saveStore("cx-bo-users", next);
          this.saveStore("cx-bo-session", {
            id: curUser.id,
            role: curUser.role,
            email: em,
          });
          this.setState({
            users: next,
            setAvImg: st.setAvUserId === curUser.id ? av : st.setAvImg,
            modal: "",
            selfPw: "",
            selfPw2: "",
            modalErr: "",
          });
          fireToast("บันทึกข้อมูลบัญชีส่วนตัวเรียบร้อยแล้ว");
        },
        stKpis,
        stFilters,
        stOwnerFilters,
        stViewBtns,
        stCards,
        stImgPresets,
        stMapSel,
        stTabIsTable: stViewVal === "table",
        stTabIsMap: stViewVal === "map",
        hasOpenStMenu: !!activeStMenuRow,
        activeStMenu: activeStMenuRow || {
          id: "",
          code: "",
          mapUrl: "#",
          maintToggleLabel: "สลับโหมดบำรุงรักษา",
          edit: () => {},
          toggleMaint: () => {},
          askDel: () => {},
          del: () => {},
        },
        showStDelModal: isSuper && st.modal === "station_del",
        stDelTargetCode: (() => {
          const f = stAllList.find((x) => x.id === st.stDelId);
          return (f && f.code) || "STN-001";
        })(),
        stDelTargetName: (() => {
          const f = stAllList.find((x) => x.id === st.stDelId);
          return (f && f.name) || "";
        })(),
        stDelTargetMeta: (() => {
          const f = stAllList.find((x) => x.id === st.stDelId);
          return f
            ? (f.owner || payCfg.company) +
                " · " +
                (f.chargerCount || 1) +
                " ตู้ชาร์จ"
            : "";
        })(),
        confirmDelStation: () => deleteStationById(st.stDelId),
        stIsEdit: !!st.stEditId,
        askDelCurrentStation: () => {
          if (!isSuper || !st.stEditId) return;
          this.setState({
            modal: "station_del",
            stDelId: st.stEditId,
            stMenuId: "",
            modalErr: "",
          });
        },
        stMenuPopStyle:
          "position: fixed; top: " +
          (st.stMenuTop || 280) +
          "px; right: " +
          (st.stMenuRight || 44) +
          "px; z-index: 65; width: 224px; padding: 6px; border-radius: 14px; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 16px 36px rgba(15,23,42,0.18); display: flex; flex-direction: column; gap: 2px; text-align: left",
        closeStMenu: () => this.setState({ stMenuId: "" }),
        stSearch: st.stSearch,
        onStSearch: setVal("stSearch"),
        stCountBadge:
          "แสดง " +
          filteredStations.length +
          " / " +
          stAllList.length +
          " รายการ",
        noStMatch: filteredStations.length === 0,
        stModalTabs: [
          ["general", "1. ทั่วไป & เจ้าของ"],
          ["location", "2. ที่ตั้ง & พิกัด Maps"],
          ["chargers", "3. ผู้ดูแล & ตู้ชาร์จ"],
          ["incidents", "4. สถิติเหตุขัดข้อง"],
        ].map(([id, label]) => {
          const activeTabM = st.stModalTab || "general";
          const on = activeTabM === id;
          return {
            label,
            pick: () => this.setState({ stModalTab: id }),
            style:
              "padding: 8px 2px 10px; border: 0; border-bottom: 2.5px solid " +
              (on ? accent : "transparent") +
              "; background: transparent; font-family: inherit; font-size: 13.5px; font-weight: " +
              (on ? 700 : 600) +
              "; color: " +
              (on ? "#1F1F1F" : "#6B6B6B") +
              "; cursor: pointer; white-space: nowrap",
          };
        }),
        stTabIsGen: (st.stModalTab || "general") === "general",
        stTabIsLoc: st.stModalTab === "location",
        stTabIsChg: st.stModalTab === "chargers",
        stTabIsInc: st.stModalTab === "incidents",
        openAddSt: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const nextNo = String(stAllList.length + 1).padStart(3, "0");
          this.setState({
            modal: "station",
            modalErr: "",
            stMenuId: "",
            stModalTab: "general",
            stEditId: "",
            stCode: "STN-" + nextNo,
            stImg: "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
            stName: "",
            stNameEn: "",
            stOwner: payCfg.company,
            stContractType: "ลงทุนเอง 100%",
            stOwnerTaxId: "0105564008912",
            stAddr: "",
            stArea: "กรุงเทพมหานคร · เปิด 24 ชม.",
            stLat: "13.7563",
            stLng: "100.5650",
            stMapUrl: "https://www.google.com/maps?q=13.7563,100.5650",
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
            stUnits: [
              {
                id: "new_u1",
                code: "เครื่อง #6011",
                power: "150 kW DC · 2 หัว",
                status: "online",
                ocpp: "OCPP 2.0.1 Connected",
              },
              {
                id: "new_u2",
                code: "เครื่อง #6012",
                power: "150 kW DC · 2 หัว",
                status: "online",
                ocpp: "OCPP 2.0.1 Connected",
              },
            ],
            stIncidents: [],
            stNewUnitCode: "",
            stNewUnitPower: "150 kW DC · 2 หัว",
            stNewIncNote: "",
          });
        },
        showStModal: isSuper && st.modal === "station",
        stModalTitle: st.stEditId
          ? "แก้ไขข้อมูลสถานีชาร์จ"
          : "เพิ่มสถานีชาร์จใหม่",
        stCode: st.stCode || "STN-009",
        stSaveBtn: "บันทึกข้อมูลสถานี",
        stImgPreview:
          String(st.stImg || "").trim() ||
          "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg",
        stImg: st.stImg,
        onStImg: setVal("stImg"),
        stName: st.stName,
        stNameEn: st.stNameEn,
        stOwner: st.stOwner,
        stContractType: st.stContractType,
        stOwnerTaxId: st.stOwnerTaxId,
        stAddr: st.stAddr,
        stArea: st.stArea,
        stLat: st.stLat,
        stLng: st.stLng,
        stMapUrl: st.stMapUrl,
        stContactName: st.stContactName,
        stContactPhone: st.stContactPhone,
        stHours: st.stHours,
        stChargers: st.stChargers,
        stBays: st.stBays,
        stPower: st.stPower,
        stFaultCount: st.stFaultCount,
        stFaultDate: st.stFaultDate,
        stFaultDetail: st.stFaultDetail,
        onStName: setVal("stName"),
        onStNameEn: setVal("stNameEn"),
        onStOwner: setVal("stOwner"),
        onStOwnerTaxId: setVal("stOwnerTaxId"),
        onStAddr: setVal("stAddr"),
        onStArea: setVal("stArea"),
        onStHours: setVal("stHours"),
        stContractBtns: [
          "ลงทุนเอง 100%",
          "Revenue Sharing",
          "เช่าพื้นที่ / Partner",
        ].map((c) => ({
          label: c,
          pick: () => this.setState({ stContractType: c }),
          style: nwBtnStyle((st.stContractType || "ลงทุนเอง 100%") === c),
        })),
        onStLat: (e) => {
          const lat = e && e.target ? e.target.value : "";
          const lng = String(this.state.stLng || "").trim();
          const autoMap =
            lat.trim() && lng
              ? "https://www.google.com/maps?q=" + lat.trim() + "," + lng
              : this.state.stMapUrl;
          this.setState({ stLat: lat, stMapUrl: autoMap, modalErr: "" });
        },
        onStLng: (e) => {
          const lng = e && e.target ? e.target.value : "";
          const lat = String(this.state.stLat || "").trim();
          const autoMap =
            lat && lng.trim()
              ? "https://www.google.com/maps?q=" + lat + "," + lng.trim()
              : this.state.stMapUrl;
          this.setState({ stLng: lng, stMapUrl: autoMap, modalErr: "" });
        },
        onStPinPadClick: (e) => {
          if (!e || !e.currentTarget || !e.currentTarget.getBoundingClientRect)
            return;
          const r = e.currentTarget.getBoundingClientRect();
          const rx = Math.max(
            0.05,
            Math.min(0.95, (e.clientX - r.left) / Math.max(1, r.width)),
          );
          const ry = Math.max(
            0.05,
            Math.min(0.95, (e.clientY - r.top) / Math.max(1, r.height)),
          );
          const lat = (13.635 + (1 - ry) * 0.135).toFixed(4);
          const lng = (100.56 + rx * 0.165).toFixed(4);
          this.setState({
            stLat: lat,
            stLng: lng,
            stMapUrl: "https://www.google.com/maps?q=" + lat + "," + lng,
            modalErr: "",
          });
        },
        stPinX: Math.max(
          8,
          Math.min(
            92,
            Math.round(
              (((parseFloat(st.stLng) || 100.6845) - 100.56) / 0.165) * 100,
            ),
          ),
        ),
        stPinY: Math.max(
          10,
          Math.min(
            90,
            Math.round(
              (1 - ((parseFloat(st.stLat) || 13.6682) - 13.635) / 0.135) * 100,
            ),
          ),
        ),
        stPinPresets: [
          ["บางนา P3", "13.6468", "100.6805"],
          ["รามฯ บางนา", "13.6682", "100.6845"],
          ["พระราม 9", "13.7563", "100.5650"],
          ["กิ่งแก้ว กม.9", "13.6812", "100.7134"],
        ].map(([label, lat, lng]) => ({
          label,
          pick: () =>
            this.setState({
              stLat: lat,
              stLng: lng,
              stMapUrl: "https://www.google.com/maps?q=" + lat + "," + lng,
            }),
          style:
            "height: 28px; padding: 0 9px; border-radius: 8px; border: 1px solid #E0E0E0; background: #FFFFFF; font-family: inherit; font-size: 12px; font-weight: 600; color: #3A3A3A; cursor: pointer",
        })),
        onStMapUrl: setVal("stMapUrl"),
        onStContactName: setVal("stContactName"),
        onStContactPhone: setVal("stContactPhone"),
        onStChargers: setVal("stChargers"),
        onStBays: setVal("stBays"),
        onStPower: setVal("stPower"),
        onStFaultCount: setVal("stFaultCount"),
        onStFaultDate: setVal("stFaultDate"),
        onStFaultDetail: setVal("stFaultDetail"),
        stNewUnitCode: st.stNewUnitCode,
        onStNewUnitCode: setVal("stNewUnitCode"),
        stNewUnitPower: st.stNewUnitPower,
        onStNewUnitPower: setVal("stNewUnitPower"),
        stNewIncNote: st.stNewIncNote,
        onStNewIncNote: setVal("stNewIncNote"),
        stUnitRows: (Array.isArray(st.stUnits) ? st.stUnits : []).map((u) => {
          const isM = u.status === "maint";
          return {
            id: u.id,
            code: u.code,
            power: u.power,
            ocpp: u.ocpp || "OCPP 2.0.1",
            statText: isM
              ? "บำรุงรักษา"
              : u.status === "charging"
                ? "กำลังชาร์จ"
                : "พร้อมใช้งาน",
            statStyle:
              "padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 700; " +
              (isM
                ? "background: #FFF4E0; color: #B86A00"
                : u.status === "charging"
                  ? "background: #FFF1EB; color: #C42D00"
                  : "background: #E7F6EE; color: #146C3E"),
            toggleLabel: isM ? "เปิดใช้งาน" : "บำรุงรักษา",
            toggle: () => {
              const nextU = (st.stUnits || []).map((x) =>
                x.id === u.id
                  ? Object.assign({}, x, {
                      status: isM ? "online" : "maint",
                      ocpp: isM ? "OCPP 2.0.1 Connected" : "Maintenance Lock",
                    })
                  : x,
              );
              this.setState({ stUnits: nextU });
            },
            del: () => {
              if ((st.stUnits || []).length <= 1) {
                fireToast("ต้องมีตู้ชาร์จอย่างน้อย 1 ตู้ต่อสถานี");
                return;
              }
              const nextU = (st.stUnits || []).filter((x) => x.id !== u.id);
              this.setState({
                stUnits: nextU,
                stChargers: String(nextU.length),
                stBays: String(nextU.length * 2),
              });
            },
          };
        }),
        addStUnit: () => {
          const code =
            String(st.stNewUnitCode || "").trim() ||
            "เครื่อง #" + String(7000 + Math.floor(Math.random() * 900));
          const power =
            String(st.stNewUnitPower || "").trim() || "150 kW DC · 2 หัว";
          const nextU = (st.stUnits || []).concat([
            {
              id: "u_" + Date.now(),
              code,
              power,
              status: "online",
              ocpp: "OCPP 2.0.1 Connected",
            },
          ]);
          this.setState({
            stUnits: nextU,
            stChargers: String(nextU.length),
            stBays: String(nextU.length * 2),
            stNewUnitCode: "",
          });
          fireToast("เพิ่มตู้ชาร์จเข้าสถานีแล้ว");
        },
        stIncMonthBars: (() => {
          const fc = Math.max(0, parseInt(st.stFaultCount, 10) || 0);
          const weights = [
            ["ก.ค.", 0],
            ["ส.ค.", fc >= 3 ? 1 : 0],
            ["ก.ย.", fc >= 2 ? 1 : 0],
            ["ต.ค.", Math.min(2, fc)],
            ["พ.ย.", Math.max(fc > 0 ? 1 : 0, fc - 2)],
          ];
          const mx = Math.max(
            1,
            Math.max.apply(
              null,
              weights.map((x) => x[1]),
            ),
          );
          return weights.map(([m, v]) => ({
            label: m,
            count: String(v),
            barStyle:
              "width: 24px; height: " +
              Math.max(6, Math.round((v / mx) * 44)) +
              "px; border-radius: 6px 6px 2px 2px; background: " +
              (v >= 2 ? "#C42D00" : v === 1 ? "#F0A030" : "#E2E8F0"),
          }));
        })(),
        stIncidentRows: (Array.isArray(st.stIncidents)
          ? st.stIncidents
          : []
        ).map((inc) => ({
          date: inc.date,
          issue: inc.issue,
          mttr: inc.mttr || "30 นาที",
          state: inc.state || "แก้ไขแล้ว",
          stateStyle:
            "padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 700; " +
            (inc.state === "กำลังดำเนินการ"
              ? "background: #FFF4E0; color: #B86A00"
              : "background: #E7F6EE; color: #146C3E"),
        })),
        hasNoIncidents:
          !Array.isArray(st.stIncidents) || st.stIncidents.length === 0,
        addStIncident: () => {
          const txt = String(st.stNewIncNote || "").trim();
          if (!txt) {
            fireToast("กรุณากรอกรายละเอียดเหตุขัดข้อง");
            return;
          }
          const dt = this.fmtThaiDate(Date.now(), true);
          const nextInc = [
            {
              id: "inc_" + Date.now(),
              date: dt,
              issue: txt,
              mttr: "กำลังตรวจเช็ก",
              state: "กำลังดำเนินการ",
            },
          ].concat(st.stIncidents || []);
          const nextCount = Math.max(
            (parseInt(st.stFaultCount, 10) || 0) + 1,
            nextInc.length,
          );
          this.setState({
            stIncidents: nextInc,
            stFaultCount: String(nextCount),
            stFaultDate: dt,
            stFaultDetail: txt,
            stNewIncNote: "",
          });
          fireToast("บันทึกเหตุขัดข้องของสถานีแล้ว");
        },
        onStDrop: (e) => {
          if (e && e.preventDefault) e.preventDefault();
          const files = e && e.dataTransfer && e.dataTransfer.files;
          if (files && files[0] && typeof FileReader !== "undefined") {
            const r = new FileReader();
            r.onload = () => {
              if (typeof r.result === "string" && r.result) {
                this.setState({ stImg: r.result, modalErr: "" });
                fireToast("อัปโหลดรูปสถานีเรียบร้อยแล้ว");
              }
            };
            r.readAsDataURL(files[0]);
          }
        },
        onStDragOver: (e) => {
          if (e && e.preventDefault) e.preventDefault();
        },
        stStatBtns: [
          ["online", "เปิดให้บริการ"],
          ["charging", "กำลังชาร์จ"],
          ["maint", "บำรุงรักษา"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ stStatus: id, modalErr: "" }),
          style: nwBtnStyle(st.stStatus === id),
        })),
        onStFile: (e) => {
          if (!isSuper) return;
          const f = e && e.target && e.target.files && e.target.files[0];
          if (!f) return;
          if (typeof FileReader !== "undefined") {
            const r = new FileReader();
            r.onload = () => {
              if (typeof r.result === "string" && r.result) {
                this.setState({ stImg: r.result, modalErr: "" });
                fireToast("อัปโหลดรูปสถานีเรียบร้อยแล้ว");
              }
            };
            r.onerror = () =>
              this.setState({ modalErr: "ไม่สามารถอ่านไฟล์รูปภาพได้" });
            r.readAsDataURL(f);
          } else {
            this.setState({ modalErr: "ไม่สามารถอ่านไฟล์รูปภาพได้" });
          }
        },
        saveStation: () => {
          if (!isSuper) return;
          const name = String(st.stName || "").trim();
          const owner = String(st.stOwner || "").trim();
          const address = String(st.stAddr || "").trim();
          const lat = String(st.stLat || "").trim();
          const lng = String(st.stLng || "").trim();
          const mapUrl =
            String(st.stMapUrl || "").trim() ||
            (lat && lng
              ? "https://www.google.com/maps?q=" + lat + "," + lng
              : "");
          const contactName = String(st.stContactName || "").trim();
          const contactPhone = String(st.stContactPhone || "").trim();
          const chargers = parseInt(st.stChargers, 10) || 0;
          const bays = Math.max(
            chargers,
            parseInt(st.stBays, 10) || chargers * 2,
          );
          const faultCount = Math.max(0, parseInt(st.stFaultCount, 10) || 0);
          if (!name || !owner) {
            this.setState({
              modalErr: "กรุณากรอกชื่อสถานีและชื่อเจ้าของสถานี",
              stModalTab: "general",
            });
            return;
          }
          if (!address) {
            this.setState({
              modalErr: "กรุณากรอกที่อยู่สถานี",
              stModalTab: "location",
            });
            return;
          }
          if (
            (!lat || !lng || isNaN(Number(lat)) || isNaN(Number(lng))) &&
            !mapUrl
          ) {
            this.setState({
              modalErr:
                "กรุณาระบุพิกัด Lat / Lng หรือลิงก์ Google Map ที่ถูกต้อง",
              stModalTab: "location",
            });
            return;
          }
          if (!contactName || !contactPhone) {
            this.setState({
              modalErr: "กรุณาระบุชื่อและช่องทางติดต่อผู้ดูแลสถานี",
              stModalTab: "chargers",
            });
            return;
          }
          if (chargers < 1) {
            this.setState({
              modalErr: "กรุณาระบุจำนวนตู้ชาร์จตั้งแต่ 1 ตู้ขึ้นไป",
              stModalTab: "chargers",
            });
            return;
          }
          const img =
            String(st.stImg || "").trim() ||
            "./img/18970bd8ea282f5bf473c1f7b19d490d.jpg";
          const power =
            String(st.stPower || "").trim() || "150 kW DC · " + bays + " หัว";
          const status =
            ["online", "charging", "maint"].indexOf(st.stStatus) >= 0
              ? st.stStatus
              : "online";
          const lastFaultDate =
            String(st.stFaultDate || "").trim() ||
            (faultCount > 0
              ? this.fmtThaiDate(Date.now(), true)
              : "ยังไม่มีเหตุขัดข้อง");
          const faultDetail =
            String(st.stFaultDetail || "").trim() ||
            "ไม่พบแจ้งขัดข้องในช่วง 30 วันที่ผ่านมา";
          const rawList =
            st.stations && st.stations.length
              ? st.stations
              : this.seedStations();
          const isEdit = !!st.stEditId;
          const unitsSynced =
            Array.isArray(st.stUnits) && st.stUnits.length === chargers
              ? st.stUnits
              : undefined;
          const fields = {
            code: String(st.stCode || "").trim() || "STN-009",
            img,
            name,
            nameEn: String(st.stNameEn || "").trim(),
            owner,
            contractType: st.stContractType || "ลงทุนเอง 100%",
            ownerTaxId: String(st.stOwnerTaxId || "").trim(),
            hours: String(st.stHours || "").trim() || "เปิด 24 ชม.",
            address,
            area: String(st.stArea || "").trim() || address.slice(0, 32),
            lat,
            lng,
            mapUrl,
            contactName,
            contactPhone,
            chargerCount: chargers,
            totalBays: bays,
            freeBays: status === "maint" ? 0 : bays,
            power,
            status,
            faultCount,
            lastFaultDate,
            faultDetail,
            incidents: Array.isArray(st.stIncidents) ? st.stIncidents : [],
            uptimePct: +Math.max(85, 100 - faultCount * 0.6).toFixed(1),
          };
          if (unitsSynced) fields.units = unitsSynced;
          let next;
          if (isEdit) {
            next = rawList.map((x) =>
              x.id === st.stEditId ? Object.assign({}, x, fields) : x,
            );
          } else {
            next = [
              Object.assign(
                { id: "st_" + Date.now(), monId: "", share: 0.08 },
                fields,
              ),
            ].concat(rawList);
          }
          this.saveStore("cx-bo-stations", next);
          this.setState({
            stations: next,
            modal: "",
            stEditId: "",
            stMenuId: "",
            modalErr: "",
          });
          fireToast(
            isEdit
              ? "บันทึกการแก้ไขข้อมูลสถานีแล้ว"
              : "เพิ่มสถานีชาร์จเรียบร้อยแล้ว",
          );
        },
        exportStExcel: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const xml = this.buildStationsExcelXml(filteredStations, payCfg);
          const fn = "ChargeX-Stations-" + this.todayIso() + ".xls";
          this._lastStExcel = {
            filename: fn,
            xml,
            mime: "application/vnd.ms-excel",
          };
          try {
            if (
              typeof document !== "undefined" &&
              typeof Blob !== "undefined" &&
              typeof URL !== "undefined" &&
              URL.createObjectURL
            ) {
              const b = new Blob([xml], {
                type: "application/vnd.ms-excel;charset=utf-8",
              });
              const u = URL.createObjectURL(b);
              const a = document.createElement("a");
              a.href = u;
              a.download = fn;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => {
                try {
                  URL.revokeObjectURL(u);
                } catch (er) {}
              }, 1500);
            }
          } catch (er) {}
          fireToast("ส่งออกรายงานสถานี Excel (.xls) เรียบร้อยแล้ว");
        },
        exportStPdf: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const html = this.buildStationsPdfHtml(filteredStations, payCfg);
          this._lastStPdfHtml = html;
          try {
            if (typeof document !== "undefined" && document.createElement) {
              const fr = document.createElement("iframe");
              fr.style.cssText =
                "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
              document.body.appendChild(fr);
              const doc =
                fr.contentDocument ||
                (fr.contentWindow && fr.contentWindow.document);
              if (doc) {
                doc.open();
                doc.write(html);
                doc.close();
                setTimeout(() => {
                  try {
                    if (fr.contentWindow) {
                      fr.contentWindow.focus();
                      fr.contentWindow.print();
                    }
                  } catch (e) {}
                  setTimeout(() => {
                    try {
                      if (fr.parentNode) fr.parentNode.removeChild(fr);
                    } catch (e) {}
                  }, 1000);
                }, 120);
              }
            }
          } catch (er) {}
          fireToast("เปิดหน้าต่างส่งออก PDF สถานีเรียบร้อยแล้ว");
        },
        rpRtBadgeStyle:
          "padding: 4px 10px; border-radius: 999px; font-size: 12.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; " +
          (st.rpRealTime
            ? "background: #E7F6EE; color: #146C3E"
            : "background: #FFF4E0; color: #B86A00"),
        rpRtDotStyle:
          "width: 8px; height: 8px; border-radius: 999px; background: " +
          (st.rpRealTime ? "#146C3E" : "#B86A00"),
        rpRtStatusText: st.rpRealTime
          ? "Live Stream · ซิงค์ทุก 5 วินาที"
          : "หยุดสตรีมชั่วคราว",
        rpRtMetaText:
          "อัปเดต " +
          (st.rpLastSyncTime || "19:15:00") +
          " · #" +
          (st.rpRtTick || 1) +
          " (" +
          rep.fromIso +
          "–" +
          rep.toIso +
          ")",
        rpRtBtnStyle:
          "height: 32px; padding: 0 11px; border-radius: 9px; font-family: inherit; font-size: 12.5px; font-weight: 700; cursor: pointer; white-space: nowrap; " +
          (st.rpRealTime
            ? "border: 1px solid #E0E0E0; background: #FFF4E0; color: #B86A00"
            : "border: 0; background: #146C3E; color: #FFFFFF"),
        rpRtBtnLabel: st.rpRealTime ? "หยุด Real Time" : "เปิด Real Time",
        toggleRpRt: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const nextRt = !this.state.rpRealTime;
          if (nextRt) {
            this.startRtTimer();
            this.syncStoreKeys();
          } else {
            clearInterval(this._rtT);
          }
          this.setState({ rpRealTime: nextRt, rpLastSyncTime: this.nowHms() });
          fireToast(
            nextRt
              ? "เปิดการสตรีมข้อมูลรายงานแบบ Real Time แล้ว"
              : "หยุดการสตรีมข้อมูล Real Time ชั่วคราว",
          );
        },
        refreshRpRt: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          this.syncStoreKeys();
          fireToast("อัปเดตข้อมูลรายงานแบบ Real Time ล่าสุดแล้ว");
        },
        exportRpExcel: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const xml = this.buildReportExcelXml(rep, payCfg);
          const fn = "ChargeX-Report-" + rep.fromIso + "_" + rep.toIso + ".xls";
          this._lastRpExcel = {
            filename: fn,
            xml,
            mime: "application/vnd.ms-excel",
          };
          try {
            if (
              typeof document !== "undefined" &&
              typeof Blob !== "undefined" &&
              typeof URL !== "undefined" &&
              URL.createObjectURL
            ) {
              const b = new Blob([xml], {
                type: "application/vnd.ms-excel;charset=utf-8",
              });
              const u = URL.createObjectURL(b);
              const a = document.createElement("a");
              a.href = u;
              a.download = fn;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => {
                try {
                  URL.revokeObjectURL(u);
                } catch (er) {}
              }, 1500);
            }
          } catch (er) {}
          fireToast("ส่งออกไฟล์รายงาน Excel (.xls) เรียบร้อยแล้ว");
        },
        exportRpPdf: () => {
          if (!isSuper) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const html = this.buildReportPdfHtml(rep, payCfg);
          this._lastRpPdfHtml = html;
          try {
            if (typeof document !== "undefined" && document.createElement) {
              const fr = document.createElement("iframe");
              fr.style.cssText =
                "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
              document.body.appendChild(fr);
              const doc =
                fr.contentDocument ||
                (fr.contentWindow && fr.contentWindow.document);
              if (doc) {
                doc.open();
                doc.write(html);
                doc.close();
                setTimeout(() => {
                  try {
                    if (fr.contentWindow) {
                      fr.contentWindow.focus();
                      fr.contentWindow.print();
                    }
                  } catch (e) {}
                  setTimeout(() => {
                    try {
                      if (fr.parentNode) fr.parentNode.removeChild(fr);
                    } catch (e) {}
                  }, 1000);
                }, 120);
              }
            }
          } catch (er) {}
          fireToast("เปิดหน้าต่างส่งออกรายงาน PDF เรียบร้อยแล้ว");
        },
        rpSearch: st.rpSearch,
        onRpSearch: setVal("rpSearch"),
        rpFrom: rep.fromIso,
        rpTo: rep.toIso,
        onRpFrom: (e) => {
          const v = e && e.target ? e.target.value : "";
          if (v)
            this.setState({
              rpFrom: v,
              rpTo: v > (st.rpTo || v) ? v : st.rpTo,
            });
        },
        onRpTo: (e) => {
          const v = e && e.target ? e.target.value : "";
          if (v)
            this.setState({
              rpTo: v,
              rpFrom: v < (st.rpFrom || v) ? v : st.rpFrom,
            });
        },
        rpDropBtns: [
          ["conn", "หัวชาร์จ", toRpArr(st.rpConnFilter), rpConnFilters],
          ["slot", "รอบเวลา", toRpArr(st.rpSlotFilter), rpSlotFilters],
          [
            "station",
            "สถานี (" + dash.stations.length + ")",
            toRpArr(st.rpStationFilter),
            rpStationFilters,
          ],
          ["role", "กลุ่มสิทธิ์", toRpArr(st.rpRoleFilter), rpRoleFilters],
        ].map(([id, base, selArr, opts]) => {
          const open = st.rpDrop === id;
          const activeCount = selArr.length;
          const text =
            activeCount === 0
              ? base + ": ทั้งหมด ▾"
              : activeCount === 1
                ? ((opts.find((o) => o.id === selArr[0]) || {}).label || base) +
                  " ▾"
                : base + " (" + activeCount + ") ▾";
          return {
            label: text,
            style:
              "width: 100%; height: 34px; padding: 0 10px; border-radius: 9px; font-family: inherit; font-size: 12.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px; cursor: pointer; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; " +
              (open || activeCount > 0
                ? "border: 1px solid " +
                  accent +
                  "; background: #FFF1EB; color: #C42D00"
                : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
            toggle: (e) => {
              if (e && e.stopPropagation) e.stopPropagation();
              if (open) {
                this.setState({ rpDrop: "" });
                return;
              }
              let top = 260,
                left = 320;
              if (
                e &&
                e.currentTarget &&
                e.currentTarget.getBoundingClientRect &&
                typeof window !== "undefined"
              ) {
                const r = e.currentTarget.getBoundingClientRect();
                top = Math.round(
                  Math.min(window.innerHeight - 240, r.bottom + 6),
                );
                left = Math.round(
                  Math.min(window.innerWidth - 260, Math.max(16, r.left)),
                );
              }
              this.setState({ rpDrop: id, rpDropTop: top, rpDropLeft: left });
            },
          };
        }),
        hasOpenRpDrop:
          ["conn", "slot", "station", "role"].indexOf(st.rpDrop) >= 0,
        closeRpDrop: () => this.setState({ rpDrop: "" }),
        rpDropPopStyle:
          "position: fixed; top: " +
          (st.rpDropTop || 260) +
          "px; left: " +
          (st.rpDropLeft || 320) +
          "px; z-index: 65; width: 252px; max-height: 290px; overflow-y: auto; padding: 6px; border-radius: 14px; background: #FFFFFF; border: 1px solid #E2E8F0; box-shadow: 0 16px 36px rgba(15,23,42,0.18); display: flex; flex-direction: column; gap: 2px",
        rpDropTitle:
          st.rpDrop === "conn"
            ? "เลือกประเภทหัวชาร์จ (เลือกได้หลายค่า)"
            : st.rpDrop === "slot"
              ? "เลือกรอบเวลา (เลือกได้หลายค่า)"
              : st.rpDrop === "station"
                ? "เลือกสถานีชาร์จ (เลือกได้หลายค่า)"
                : "เลือกกลุ่มสิทธิ์ / User Role",
        rpDropOpts:
          st.rpDrop === "conn"
            ? rpConnFilters
            : st.rpDrop === "slot"
              ? rpSlotFilters
              : st.rpDrop === "station"
                ? rpStationFilters
                : rpRoleFilters,
        rpActiveChips: (() => {
          const chips = [];
          if (String(st.rpSearch || "").trim())
            chips.push({
              label: "ค้นหา: " + String(st.rpSearch).trim(),
              clear: () => this.setState({ rpSearch: "" }),
            });
          [
            ["rpConnFilter", "หัวชาร์จ", rpConnFilters],
            ["rpSlotFilter", "รอบเวลา", rpSlotFilters],
            ["rpStationFilter", "สถานี", rpStationFilters],
            ["rpRoleFilter", "สิทธิ์", rpRoleFilters],
          ].forEach(([k, pre, opts]) => {
            toRpArr(st[k]).forEach((val) => {
              const lbl = (opts.find((o) => o.id === val) || {}).label || val;
              chips.push({
                label: pre + ": " + lbl,
                clear: () => {
                  const rest = toRpArr(st[k]).filter((x) => x !== val);
                  this.setState({ [k]: rest.length ? rest : "all" });
                },
              });
            });
          });
          return chips;
        })(),
        hasRpActiveChips:
          !!String(st.rpSearch || "").trim() ||
          toRpArr(st.rpConnFilter).length > 0 ||
          toRpArr(st.rpSlotFilter).length > 0 ||
          toRpArr(st.rpStationFilter).length > 0 ||
          toRpArr(st.rpRoleFilter).length > 0,
        resetRpFilters: () => {
          const defEndRp =
            this.todayIso() > "2026-11-17" ? this.todayIso() : "2026-11-17";
          this.setState({
            rpSearch: "",
            rpFrom: "2026-11-01",
            rpTo: defEndRp,
            rpConnFilter: "all",
            rpSlotFilter: "all",
            rpStationFilter: "all",
            rpRoleFilter: "all",
            rpSection: "all",
            rpDrop: "",
          });
          fireToast("ล้างตัวกรองรายงานทั้งหมดแล้ว");
        },
        rpCountBadge:
          "ตู้ชาร์จ " +
          rep.rpAllChargers.length +
          " · สถานี " +
          rep.rpStationRows.length +
          " · สมาชิก " +
          rep.rpUserRows.length +
          " · เข้าใช้ " +
          rep.rpAccessRows.length,
        rpConnFilters,
        rpSlotFilters,
        rpStationFilters,
        rpRoleFilters,
        rpViewBtns,
        showRpUsage: rpSec === "all" || rpSec === "usage",
        showRpUsers: rpSec === "all" || rpSec === "users",
        showRpAccess: rpSec === "all" || rpSec === "access",
        showRpStations: rpSec === "all" || rpSec === "stations",
        showRpChargers: rpSec === "all" || rpSec === "chargers",
        rpKpis: rep.rpKpis,
        rpConnRows: rep.rpConnRows,
        rpConnCountText: rep.rpConnRows.length + " ประเภท",
        rpHasConnSummary: rep.rpConnRows.length > 1,
        rpConnSummaryMeta:
          "(" +
          rep.rpConnRows.reduce((a, b) => a + b.units, 0) +
          " ตู้ · " +
          rep.rpConnRows.length +
          " ประเภท)",
        rpConnSummaryRev:
          "฿" +
          this.fmtNum(
            rep.rpConnRows.reduce((a, b) => a + b.rev, 0),
            2,
          ),
        rpConnSummarySessKwh:
          this.fmtNum(rep.rpConnRows.reduce((a, b) => a + b.sessions, 0)) +
          " ครั้ง · " +
          this.fmtNum(
            +rep.rpConnRows.reduce((a, b) => a + b.kwh, 0).toFixed(1),
            1,
          ) +
          " kWh",
        rpConnSummaryBar:
          "height: 100%; border-radius: 999px; background: #146C3E; width: 100%",
        rpSlotRows: rep.rpSlotRows,
        rpSlotCountText: rep.rpSlotRows.length + " รอบเวลา",
        rpStUsageRows: rep.rpStUsageRows,
        rpStUsageCountText: rep.rpStUsageRows.length + " แห่ง",
        rpUnitUsageRows: rep.rpUnitUsageRows,
        rpUnitUsageCountText: "Top " + rep.rpUnitUsageRows.length + " ตู้",
        noRpUsageMatch: rep.rpAllChargers.length === 0,
        rpUsersCountText: "ผู้ใช้ทั้งหมด " + rep.rpUserRows.length + " คน",
        rpUserRows: rep.rpUserRows,
        noRpUsersMatch: rep.rpUserRows.length === 0,
        rpAccessCountText:
          "ประวัติเข้าใช้ " + rep.rpAccessRows.length + " รายการ",
        rpAccessRows: rep.rpAccessRows,
        noRpAccessMatch: rep.rpAccessRows.length === 0,
        rpStationsCountText:
          "สถานีทั้งหมด " + rep.rpStationRows.length + " แห่ง",
        rpStationRows: rep.rpStationRows,
        noRpStationsMatch: rep.rpStationRows.length === 0,
        rpChargersCountText:
          "ตู้ชาร์จทั้งหมด " + rep.rpAllChargers.length + " ตู้",
        rpAllChargers: rep.rpAllChargers,
        noRpChargersMatch: rep.rpAllChargers.length === 0,
        setViewBtns: (() => {
          const curSv = [
            "profile",
            "password",
            "legal",
            "perms",
            "categories",
          ].includes(st.setView)
            ? st.setView
            : "profile";
          return [
            [
              "profile",
              "โปรไฟล์ & ภาษา",
              "รูปภาพและภาษาของระบบ",
              "บัญชี",
            ],
            [
              "password",
              "ความปลอดภัยและรหัสผ่าน",
              "รหัสผ่านและเกณฑ์ 5 ข้อ",
              "",
            ],
            [
              "legal",
              "ข้อกำหนดและนโยบาย",
              "Terms & PDPA พรีวิวมือถือ",
              "v" + (st.setTermsVer || "2.4"),
            ],
            [
              "perms",
              "สิทธิ์การเข้าถึงข้อมูล",
              "นโยบายกลางและ 10 โมดูล",
              "",
            ],
            [
              "categories",
              "หมวดหมู่ระบบ",
              "ข่าวสาร คูปอง และสถานีชาร์จ",
              String(categoriesList.length),
            ],
          ].map(([id, label, sub, badge]) => {
            const on = curSv === id;
            return {
              id,
              label,
              sub,
              badge,
              hasBadge: !!badge,
              isProfile: id === "profile",
              isPassword: id === "password",
              isLegal: id === "legal",
              isPerms: id === "perms",
              isCategories: id === "categories",
              active: on,
              pick: () => this.setState({ setView: id, modalErr: "" }),
              style:
                "width: 100%; box-sizing: border-box; text-align: left; padding: 11px 12px; min-height: 60px; border-radius: 12px; font-family: inherit; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: all .15s; " +
                (on
                  ? d
                    ? "background: rgba(252,57,1,0.16); border: 1.5px solid #FC3901; color: #FFFFFF"
                    : "background: #FFF1EB; border: 1.5px solid #FDBA9B; color: #1F1F1F"
                  : d
                    ? "background: transparent; border: 1.5px solid transparent; color: #E4E4E7"
                    : "background: transparent; border: 1.5px solid transparent; color: #3A3A3A"),
              iconColor: on ? "#FC3901" : d ? "#A1A1AA" : "#6B6B6B",
              badgeStyle:
                "margin-left: auto; flex: none; padding: 2px 7px; border-radius: 999px; font-size: 11.5px; font-weight: 700; " +
                (on
                  ? "background: #FC3901; color: #FFFFFF"
                  : d
                    ? "background: #27272A; color: #E4E4E7"
                    : "background: #F4F4F4; color: #555555"),
            };
          });
        })(),
        showSetProfile:
          ![
            "profile",
            "password",
            "legal",
            "perms",
            "categories",
          ].includes(st.setView) || st.setView === "profile",
        showSetPassword: st.setView === "password",
        showSetLegal: st.setView === "legal",
        showSetPerms: st.setView === "perms",
        showSetCats: st.setView === "categories",
        ...(() => {
          const avPool = isSuper
            ? normUsers
            : curUser
              ? [curUser]
              : normUsers.slice(0, 1);
          const activeAvUser =
            avPool.find((x) => x.id === st.setAvUserId) ||
            curUser ||
            avPool[0];
          const avSavedSrc =
            (activeAvUser && activeAvUser.avatar) ||
            this.avatarPresetUrl("admin");
          const avCurSrc = st.setAvImg || avSavedSrc;
          const canEditAv =
            canView("settings") ||
            (permPolicy.allowSelfProfileEdit !== false &&
              curUser &&
              activeAvUser &&
              curUser.id === activeAvUser.id);
          const readAvFile = (f) => {
            if (!canEditAv) {
              fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
              return;
            }
            if (!f) return;
            if (f.size && f.size > 2 * 1024 * 1024) {
              fireToast("ขนาดไฟล์รูปภาพต้องไม่เกิน 2 MB");
              return;
            }
            if (typeof FileReader !== "undefined") {
              const r = new FileReader();
              r.onload = () => {
                this.setState({ setAvImg: String(r.result || "") });
                fireToast("โหลดภาพตัวอย่างเรียบร้อย กดปุ่มบันทึกเพื่อยืนยัน");
              };
              r.onerror = () => fireToast("ไม่สามารถอ่านไฟล์รูปภาพได้");
              r.readAsDataURL(f);
            }
          };
          return {
            setAvCanSwitchUser: isSuper && avPool.length > 1,
            setAvTargetName: activeAvUser ? activeAvUser.name : "-",
            setAvTargetRoleText: activeAvUser
              ? (activeAvUser.roleName || "Admin") +
                (curUser && activeAvUser.id === curUser.id
                  ? " · บัญชีที่กำลังใช้งาน"
                  : "")
              : "",
            setAvUserBtns: avPool.map((u) => {
              const on = activeAvUser && activeAvUser.id === u.id;
              return {
                label: u.name,
                roleSub: u.roleName || "Admin",
                pick: () =>
                  this.setState({
                    setAvUserId: u.id,
                    setAvImg:
                      u.avatar ||
                      this.avatarPresetUrl(
                        u.role === "super_admin" ? "admin" : "op",
                      ),
                  }),
                style:
                  "width: 100%; height: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 10px; font-family: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; text-align: center; transition: all .15s; " +
                  (on
                    ? "border: 1.5px solid " +
                      accent +
                      "; background: " +
                      accent +
                      "; color: #FFFFFF"
                    : d
                      ? "border: 1.5px solid #2C2C31; background: #18181B; color: #E4E4E7"
                      : "border: 1.5px solid #E6E6E6; background: #FFFFFF; color: #3A3A3A"),
              };
            }),
            setAvPreview: avCurSrc,
            setAvDirty: avCurSrc !== avSavedSrc,
            setAvImg: st.setAvImg || "",
            setAvUrlOpen: !!st.setAvUrlOpen,
            setAvUrlToggleLabel: st.setAvUrlOpen
              ? "ซ่อนช่อง URL รูปภาพ"
              : "ระบุลิงก์ URL รูปภาพภายนอก",
            toggleSetAvUrl: () =>
              this.setState({ setAvUrlOpen: !st.setAvUrlOpen }),
            onSetAvImg: setVal("setAvImg"),
            onSetAvFile: (e) => {
              const f = e && e.target && e.target.files && e.target.files[0];
              readAvFile(f);
            },
            onSetAvDragOver: (e) => {
              if (e && e.preventDefault) e.preventDefault();
            },
            onSetAvDrop: (e) => {
              if (e && e.preventDefault) e.preventDefault();
              const f =
                e &&
                e.dataTransfer &&
                e.dataTransfer.files &&
                e.dataTransfer.files[0];
              readAvFile(f);
            },
            setAvPresets: [
              ["ชุดสีส้ม Charge X", "admin"],
              ["ชุดสีเขียว Eco", "green"],
              ["ชุดผู้ดูแลระบบ", "op"],
              ["ชุดเทคนิคสถานี", "tech"],
            ].map(([label, kind]) => {
              const src = this.avatarPresetUrl(kind);
              const on = String(avCurSrc || "") === src;
              return {
                label,
                miniSrc: src,
                active: on,
                pick: () => this.setState({ setAvImg: src }),
                style:
                  "width: 100%; height: 100%; min-width: 0; box-sizing: border-box; padding: 14px 10px; border-radius: 12px; font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; text-align: center; transition: all .15s; " +
                  (on
                    ? d
                      ? "border: 1.5px solid #FC3901; background: rgba(252,57,1,0.16); color: #FFFFFF"
                      : "border: 1.5px solid #FC3901; background: #FFF1EB; color: #C42D00"
                    : d
                      ? "border: 1.5px solid #2C2C31; background: #18181B; color: #E4E4E7"
                      : "border: 1.5px solid #E6E6E6; background: #FAFAFA; color: #3A3A3A"),
              };
            }),
            saveUserAvatar: () => {
              if (!canEditAv) {
                fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                return;
              }
              const img = String(st.setAvImg || "").trim();
              if (!img) {
                fireToast("กรุณาเลือกรูปภาพหรืออัปโหลดรูปภาพ");
                return;
              }
              if (!activeAvUser) return;
              const nextU = st.users.map((u) =>
                u.id === activeAvUser.id ? Object.assign({}, u, { avatar: img }) : u,
              );
              this.saveStore("cx-bo-users", nextU);
              this.setState({
                users: nextU,
                setAvImg: img,
                selfAvImg:
                  curUser && activeAvUser.id === curUser.id
                    ? img
                    : st.selfAvImg,
              });
              fireToast("บันทึกภาพโปรไฟล์เรียบร้อยแล้ว");
            },
          };
        })(),
        setLangBtns: [
          [
            "th",
            "ภาษาไทย (Thai)",
            "TH",
            "แสดงเมนู รายงาน และเอกสารเป็นภาษาไทย",
          ],
          [
            "en",
            "ภาษาอังกฤษ (English)",
            "EN",
            "Display menus, reports, and docs in EN",
          ],
        ].map(([code, label, codeBadge, desc]) => {
          const on = (en ? "en" : "th") === code;
          return {
            label,
            codeBadge,
            desc,
            active: on,
            pick: () => {
              try {
                localStorage.setItem("cx-lang", code);
              } catch (e) {}
              this.setState({ lang: code });
              fireToast(
                code === "en"
                  ? "เปลี่ยนภาษาเป็นภาษาอังกฤษเรียบร้อยแล้ว"
                  : "เปลี่ยนภาษาเป็นภาษาไทยเรียบร้อยแล้ว",
              );
            },
            style:
              "width: 100%; height: 100%; min-width: 0; box-sizing: border-box; padding: 14px 16px; border-radius: 14px; font-family: inherit; cursor: pointer; display: flex; align-items: center; gap: 12px; text-align: left; transition: all .15s; " +
              (on
                ? d
                  ? "border: 1.5px solid #FC3901; background: rgba(252,57,1,0.16); color: #FFFFFF"
                  : "border: 1.5px solid #FC3901; background: #FFF1EB; color: #1F1F1F"
                : d
                  ? "border: 1.5px solid #2C2C31; background: #18181B; color: #E4E4E7"
                  : "border: 1.5px solid #E6E6E6; background: #FFFFFF; color: #3A3A3A"),
            badgeStyle:
              "width: 40px; height: 40px; border-radius: 10px; flex: none; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; letter-spacing: 0.04em; " +
              (on
                ? "background: #FC3901; color: #FFFFFF"
                : d
                  ? "background: #27272A; color: #E4E4E7"
                  : "background: #F4F4F4; color: #3A3A3A"),
          };
        }),
        setLangScopeBtns: [
          [
            "all",
            "ซิงค์ทั้งระบบ (Back Office + แอป Charge X)",
            "ซิงค์ภาษาทั้ง Back Office และแอป Charge X",
          ],
          [
            "backoffice",
            "เฉพาะหน้าจอ Back Office ส่วนตัว",
            "เปลี่ยนภาษาเฉพาะหน้าจอ Back Office นี้",
          ],
        ].map(([id, label, desc]) => {
          const on = (st.setLangScope || "all") === id;
          return {
            label,
            desc,
            active: on,
            pick: () => {
              try {
                localStorage.setItem("cx-bo-lang-scope", id);
              } catch (e) {}
              this.setState({ setLangScope: id });
              fireToast("บันทึกขอบเขตการตั้งค่าภาษาแล้ว");
            },
            style:
              "width: 100%; height: 100%; min-width: 0; box-sizing: border-box; padding: 12px 14px; border-radius: 12px; font-family: inherit; cursor: pointer; display: flex; align-items: center; gap: 10px; text-align: left; transition: all .15s; " +
              (on
                ? d
                  ? "border: 1.5px solid #FC3901; background: rgba(252,57,1,0.14); color: #FFFFFF"
                  : "border: 1.5px solid #FC3901; background: #FFF8F5; color: #1F1F1F"
                : d
                  ? "border: 1.5px solid #2C2C31; background: #18181B; color: #D4D4D8"
                  : "border: 1.5px solid #E6E6E6; background: #FAFAFA; color: #3A3A3A"),
          };
        }),
        ...(() => {
          const pwPool = isSuper
            ? normUsers
            : curUser
              ? [curUser]
              : normUsers.slice(0, 1);
          const activePwUser =
            pwPool.find((x) => x.id === st.setPwUserId) ||
            curUser ||
            pwPool[0];
          const rulesArr = pwRules(st.setNewPw);
          const pwScore = rulesArr.filter((x) => x.mark === "✓").length;
          const p1Str = String(st.setNewPw || "");
          const p2Str = String(st.setNewPw2 || "");
          const matchOk = !!p1Str && p1Str === p2Str;
          const canSavePw = pwScore === 5 && matchOk;
          return {
            setPwCanSwitchUser: isSuper && pwPool.length > 1,
            setPwTargetLabel: activePwUser
              ? activePwUser.name + " (" + (activePwUser.roleName || "Admin") + ")"
              : "",
            setPwUserBtns: pwPool.map((u) => {
              const on = activePwUser && activePwUser.id === u.id;
              return {
                label: u.name,
                pick: () =>
                  this.setState({
                    setPwUserId: u.id,
                    setNewPw: "",
                    setNewPw2: "",
                  }),
                style:
                  "width: 100%; height: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 10px; font-family: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; text-align: center; transition: all .15s; " +
                  (on
                    ? "border: 1.5px solid " +
                      accent +
                      "; background: " +
                      accent +
                      "; color: #FFFFFF"
                    : d
                      ? "border: 1.5px solid #2C2C31; background: #18181B; color: #E4E4E7"
                      : "border: 1.5px solid #E6E6E6; background: #FFFFFF; color: #3A3A3A"),
              };
            }),
            setPwVisible: !!st.setPwVisible,
            setPwInputType: st.setPwVisible ? "text" : "password",
            setPwVisLabel: st.setPwVisible ? "ซ่อน" : "แสดง",
            toggleSetPwVis: () =>
              this.setState({ setPwVisible: !st.setPwVisible }),
            setNewPw: st.setNewPw,
            onSetNewPw: setVal("setNewPw"),
            setNewPw2: st.setNewPw2,
            onSetNewPw2: setVal("setNewPw2"),
            setPwRules: rulesArr,
            setPwMeterBarStyle:
              "height: 6px; border-radius: 999px; transition: all .2s; width: " +
              pwScore * 20 +
              "%; background: " +
              (pwScore >= 5 ? "#146C3E" : pwScore >= 3 ? "#D97706" : "#DC2626"),
            setPwMeterLabel: !p1Str
              ? "รอการกรอกรหัสผ่านใหม่"
              : pwScore === 5
                ? "ผ่านครบทั้ง 5 เกณฑ์ความปลอดภัย"
                : "ผ่านเกณฑ์ " + pwScore + "/5 ข้อ",
            setPwMeterColor: !p1Str
              ? d
                ? "#9CA3AF"
                : "#6B6B6B"
              : pwScore >= 5
                ? "#146C3E"
                : pwScore >= 3
                  ? "#B45309"
                  : "#B42318",
            setPwShowMatch: !!p2Str,
            setPwMatchOk: matchOk,
            setPwMatchText: !p2Str
              ? ""
              : matchOk
                ? "รหัสผ่านยืนยันตรงกันพร้อมบันทึก"
                : "รหัสผ่านทั้งสองช่องยังไม่ตรงกัน",
            setPwReady: canSavePw,
            setPwBtnStyle:
              "height: 44px; padding: 0 18px; border-radius: 12px; font-family: inherit; font-size: 14.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: all .15s; " +
              (canSavePw
                ? "border: 0; background: " + accent + "; color: #FFFFFF"
                : d
                  ? "border: 1px solid #3F3F46; background: #27272A; color: #D4D4D8"
                  : "border: 1px solid #D4D4D8; background: #F4F4F5; color: #52525B"),
            genSetPw: () => {
              const gp = this.makeSecurePw();
              this.setState({
                setNewPw: gp,
                setNewPw2: gp,
                setPwVisible: true,
              });
              fireToast("สุ่มรหัสผ่านปลอดภัยและกรอกทั้งสองช่องให้แล้ว");
            },
            copySetPw: () => {
              if (!p1Str) {
                fireToast("กรุณากรอกหรือสุ่มรหัสผ่านก่อนคัดลอก");
                return;
              }
              try {
                if (
                  typeof navigator !== "undefined" &&
                  navigator.clipboard &&
                  navigator.clipboard.writeText
                ) {
                  navigator.clipboard.writeText(p1Str).catch(() => {});
                }
              } catch (e) {}
              fireToast("คัดลอกรหัสผ่านเรียบร้อยแล้ว");
            },
            saveSetPw: () => {
              const allowSelfPw =
                curUser && activePwUser && curUser.id === activePwUser.id;
              if (!canView("settings") && !allowSelfPw) {
                fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                return;
              }
              const p1 = String(st.setNewPw || "");
              const p2 = String(st.setNewPw2 || "");
              if (!p1) {
                fireToast("กรุณากรอกรหัสผ่าน");
                return;
              }
              if (!this.checkPw(p1).ok) {
                fireToast(
                  "รหัสผ่านไม่ผ่านเกณฑ์ความปลอดภัย (ต้องยาว 8+ ตัว มี A–Z, a–z, 0–9 และสัญลักษณ์)",
                );
                return;
              }
              if (p1 !== p2) {
                fireToast("รหัสผ่านทั้งสองช่องไม่ตรงกัน");
                return;
              }
              if (!activePwUser) return;
              const nextU = st.users.map((u) =>
                u.id === activePwUser.id
                  ? Object.assign({}, u, { password: p1 })
                  : u,
              );
              this.saveStore("cx-bo-users", nextU);
              this.setState({ users: nextU, setNewPw: "", setNewPw2: "" });
              fireToast("อัปเดตรหัสผ่านของผู้ใช้งานเรียบร้อยแล้ว");
            },
          };
        })(),
        ...(() => {
          const curDocKind =
            st.setLegalDoc === "privacy" ? "privacy" : "terms";
          const curPrevLang = st.setLegalPreviewLang === "en" ? "en" : "th";
          const termsItems = Array.isArray(st.setTermsItems)
            ? st.setTermsItems
            : this.buildLegalItems(this.parseDocSections(st.setTermsText), []);
          const privItems = Array.isArray(st.setPrivItems)
            ? st.setPrivItems
            : this.buildLegalItems(this.parseDocSections(st.setPrivText), []);
          const commitTermsItems = (items) => {
            this.setState({
              setTermsItems: items,
              setTermsText: this.fmtDocSections(
                items.map((x) => [x.h || "", x.p || ""]),
              ),
            });
          };
          const commitPrivItems = (items) => {
            this.setState({
              setPrivItems: items,
              setPrivText: this.fmtDocSections(
                items.map((x) => [x.h || "", x.p || ""]),
              ),
            });
          };
          const mapLegalRows = (items, commitFn) =>
            items.map((item, idx) => ({
              idxNum: "ข้อที่ " + (idx + 1),
              h: item.h || "",
              p: item.p || "",
              hEn: item.hEn || "",
              pEn: item.pEn || "",
              canUp: idx > 0,
              canDown: idx < items.length - 1,
              onH: (e) => {
                const v = e && e.target ? e.target.value : "";
                commitFn(
                  items.map((x, j) =>
                    j === idx ? Object.assign({}, x, { h: v }) : x,
                  ),
                );
              },
              onP: (e) => {
                const v = e && e.target ? e.target.value : "";
                commitFn(
                  items.map((x, j) =>
                    j === idx ? Object.assign({}, x, { p: v }) : x,
                  ),
                );
              },
              onHEn: (e) => {
                const v = e && e.target ? e.target.value : "";
                commitFn(
                  items.map((x, j) =>
                    j === idx ? Object.assign({}, x, { hEn: v }) : x,
                  ),
                );
              },
              onPEn: (e) => {
                const v = e && e.target ? e.target.value : "";
                commitFn(
                  items.map((x, j) =>
                    j === idx ? Object.assign({}, x, { pEn: v }) : x,
                  ),
                );
              },
              up: () => {
                if (idx <= 0) return;
                const copy = items.slice();
                const tmp = copy[idx - 1];
                copy[idx - 1] = copy[idx];
                copy[idx] = tmp;
                commitFn(copy);
              },
              down: () => {
                if (idx >= items.length - 1) return;
                const copy = items.slice();
                const tmp = copy[idx + 1];
                copy[idx + 1] = copy[idx];
                copy[idx] = tmp;
                commitFn(copy);
              },
              del: () => {
                if (items.length <= 1) {
                  fireToast("เอกสารต้องมีเนื้อหาอย่างน้อย 1 ข้อย่อย");
                  return;
                }
                commitFn(items.filter((_, j) => j !== idx));
                fireToast("ลบข้อย่อยเอกสารแล้ว (กดบันทึกเพื่อเผยแพร่)");
              },
            }));
          const isPrivDoc = curDocKind === "privacy";
          const activePrevItems = isPrivDoc ? privItems : termsItems;
          const savedDocRef = isPrivDoc
            ? Object.assign(this.seedPrivacy(), st.privacyDoc || {})
            : Object.assign(this.seedTerms(), st.termsDoc || {});
          const activeVer = isPrivDoc ? st.setPrivVer : st.setTermsVer;
          const activeDate = isPrivDoc ? st.setPrivDate : st.setTermsDate;
          const activeTitle = isPrivDoc ? st.setPrivTitle : st.setTermsTitle;
          const activeReconsent = isPrivDoc
            ? !!st.setPrivReconsent
            : !!st.setTermsReconsent;
          const legalDirty =
            String(activeTitle || "") !== String(savedDocRef.title || "") ||
            String(activeVer || "") !== String(savedDocRef.version || "") ||
            String(activeDate || "") !==
              String(savedDocRef.effectiveDate || "") ||
            activeReconsent !== !!savedDocRef.forceReconsent ||
            JSON.stringify(
              activePrevItems.map((x) => [x.h || "", x.p || ""]),
            ) !== JSON.stringify(savedDocRef.sections || []);
          return {
            setLegalDocBtns: [
              ["terms", "ข้อกำหนดการใช้บริการ (T&C)"],
              ["privacy", "นโยบายความเป็นส่วนตัว (PDPA)"],
            ].map(([id, label]) => ({
              label,
              pick: () => this.setState({ setLegalDoc: id }),
              style: dBtnStyle(curDocKind === id),
            })),
            showLegalTerms: !isPrivDoc,
            showLegalPrivacy: isPrivDoc,
            setLegalPreviewLangBtns: [
              ["th", "ไทย (TH)"],
              ["en", "English (EN)"],
            ].map(([id, label]) => {
              const on = curPrevLang === id;
              return {
                label,
                pick: () => this.setState({ setLegalPreviewLang: id }),
                style:
                  "height: 28px; padding: 0 10px; border-radius: 8px; font-family: inherit; font-size: 12px; font-weight: 700; white-space: nowrap; cursor: pointer; " +
                  (on
                    ? "border: 0; background: #FC3901; color: #FFFFFF"
                    : d
                      ? "border: 1px solid #3F3F46; background: #27272A; color: #D4D4D8"
                      : "border: 1px solid #E0E0E0; background: #FFFFFF; color: #3A3A3A"),
              };
            }),
            setLegalDirty: legalDirty,
            setTermsTitle: st.setTermsTitle,
            onSetTermsTitle: setVal("setTermsTitle"),
            setTermsTitleEn: st.setTermsTitleEn,
            onSetTermsTitleEn: setVal("setTermsTitleEn"),
            setTermsVer: st.setTermsVer,
            onSetTermsVer: setVal("setTermsVer"),
            setTermsDate: st.setTermsDate,
            onSetTermsDate: setVal("setTermsDate"),
            setTermsReconsent: !!st.setTermsReconsent,
            toggleTermsReconsent: () =>
              this.setState({ setTermsReconsent: !st.setTermsReconsent }),
            termsReconsentWrapStyle:
              "width: 44px; height: 24px; border-radius: 999px; border: 0; padding: 2px; cursor: pointer; display: inline-flex; align-items: center; transition: all .15s; " +
              (st.setTermsReconsent
                ? "justify-content: flex-end; background: #FC3901"
                : d
                  ? "justify-content: flex-start; background: #3F3F46"
                  : "justify-content: flex-start; background: #D4D4D8"),
            termsReconsentKnobStyle:
              "width: 20px; height: 20px; border-radius: 999px; background: #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.22)",
            setTermsText: st.setTermsText,
            onSetTermsText: (e) => {
              const txt = e && e.target ? e.target.value : "";
              const secs = this.parseDocSections(txt);
              const nextItems = secs.map(([h, p], i) => ({
                h,
                p,
                hEn: (termsItems[i] && termsItems[i].hEn) || "",
                pEn: (termsItems[i] && termsItems[i].pEn) || "",
              }));
              this.setState({ setTermsText: txt, setTermsItems: nextItems });
            },
            setTermsSectionRows: mapLegalRows(termsItems, commitTermsItems),
            addTermsSection: () => {
              const nextN = termsItems.length + 1;
              commitTermsItems(
                termsItems.concat([
                  {
                    h: nextN + ". หัวข้อใหม่",
                    p: "",
                    hEn: nextN + ". New Section",
                    pEn: "",
                  },
                ]),
              );
            },
            saveTerms: () => {
              if (!canView("settings")) {
                fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                return;
              }
              const title = String(st.setTermsTitle || "").trim();
              const titleEn =
                String(st.setTermsTitleEn || "").trim() || title;
              const ver = String(st.setTermsVer || "").trim();
              const date =
                String(st.setTermsDate || "").trim() || this.todayIso();
              const cleanItems = termsItems.filter(
                (x) => String(x.h || "").trim() && String(x.p || "").trim(),
              );
              const secs = cleanItems.length
                ? cleanItems.map((x) => [
                    String(x.h).trim(),
                    String(x.p).trim(),
                  ])
                : this.parseDocSections(st.setTermsText);
              const secsEn = cleanItems.map((x) => [
                String(x.hEn || x.h || "").trim(),
                String(x.pEn || x.p || "").trim(),
              ]);
              if (!title || !ver || !secs.length) {
                fireToast(
                  "กรุณากรอกข้อมูลหัวข้อ เวอร์ชัน และเนื้อหาของเอกสารให้ครบถ้วน",
                );
                return;
              }
              const doc = {
                title,
                titleEn,
                version: ver,
                effectiveDate: date,
                forceReconsent: !!st.setTermsReconsent,
                sections: secs,
                sectionsEn: secsEn,
              };
              this.saveStore("cx-bo-terms", doc);
              this.setState({
                termsDoc: doc,
                setTermsText: this.fmtDocSections(secs),
                setTermsItems: this.buildLegalItems(secs, secsEn),
              });
              fireToast("บันทึกข้อมูล Terms & Conditions เรียบร้อยแล้ว");
            },
            setPrivTitle: st.setPrivTitle,
            onSetPrivTitle: setVal("setPrivTitle"),
            setPrivTitleEn: st.setPrivTitleEn,
            onSetPrivTitleEn: setVal("setPrivTitleEn"),
            setPrivVer: st.setPrivVer,
            onSetPrivVer: setVal("setPrivVer"),
            setPrivDate: st.setPrivDate,
            onSetPrivDate: setVal("setPrivDate"),
            setPrivDpo: st.setPrivDpo,
            onSetPrivDpo: setVal("setPrivDpo"),
            setPrivReconsent: !!st.setPrivReconsent,
            togglePrivReconsent: () =>
              this.setState({ setPrivReconsent: !st.setPrivReconsent }),
            privReconsentWrapStyle:
              "width: 44px; height: 24px; border-radius: 999px; border: 0; padding: 2px; cursor: pointer; display: inline-flex; align-items: center; transition: all .15s; " +
              (st.setPrivReconsent
                ? "justify-content: flex-end; background: #FC3901"
                : d
                  ? "justify-content: flex-start; background: #3F3F46"
                  : "justify-content: flex-start; background: #D4D4D8"),
            privReconsentKnobStyle:
              "width: 20px; height: 20px; border-radius: 999px; background: #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.22)",
            setPrivText: st.setPrivText,
            onSetPrivText: (e) => {
              const txt = e && e.target ? e.target.value : "";
              const secs = this.parseDocSections(txt);
              const nextItems = secs.map(([h, p], i) => ({
                h,
                p,
                hEn: (privItems[i] && privItems[i].hEn) || "",
                pEn: (privItems[i] && privItems[i].pEn) || "",
              }));
              this.setState({ setPrivText: txt, setPrivItems: nextItems });
            },
            setPrivSectionRows: mapLegalRows(privItems, commitPrivItems),
            addPrivSection: () => {
              const nextN = privItems.length + 1;
              commitPrivItems(
                privItems.concat([
                  {
                    h: nextN + ". หัวข้อนโยบายใหม่",
                    p: "",
                    hEn: nextN + ". New Policy Section",
                    pEn: "",
                  },
                ]),
              );
            },
            savePrivacy: () => {
              if (!canView("settings")) {
                fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                return;
              }
              const title = String(st.setPrivTitle || "").trim();
              const titleEn =
                String(st.setPrivTitleEn || "").trim() || title;
              const ver = String(st.setPrivVer || "").trim();
              const dpo =
                String(st.setPrivDpo || "").trim() || "dpo@chargex.co.th";
              const date = st.setPrivDate || this.todayIso();
              const cleanItems = privItems.filter(
                (x) => String(x.h || "").trim() && String(x.p || "").trim(),
              );
              const secs = cleanItems.length
                ? cleanItems.map((x) => [
                    String(x.h).trim(),
                    String(x.p).trim(),
                  ])
                : this.parseDocSections(st.setPrivText);
              const secsEn = cleanItems.map((x) => [
                String(x.hEn || x.h || "").trim(),
                String(x.pEn || x.p || "").trim(),
              ]);
              if (!title || !ver || !secs.length) {
                fireToast(
                  "กรุณากรอกข้อมูลหัวข้อ เวอร์ชัน และเนื้อหาของเอกสารให้ครบถ้วน",
                );
                return;
              }
              const doc = {
                title,
                titleEn,
                version: ver,
                effectiveDate: date,
                dpo,
                forceReconsent: !!st.setPrivReconsent,
                sections: secs,
                sectionsEn: secsEn,
              };
              this.saveStore("cx-bo-privacy", doc);
              this.setState({
                privacyDoc: doc,
                setPrivText: this.fmtDocSections(secs),
                setPrivItems: this.buildLegalItems(secs, secsEn),
              });
              fireToast("บันทึกข้อมูล Privacy Policy เรียบร้อยแล้ว");
            },
            legalPreviewDocKind: isPrivDoc
              ? "PDPA Privacy Policy"
              : "Terms of Service",
            legalPreviewTitle:
              curPrevLang === "en"
                ? (isPrivDoc ? st.setPrivTitleEn : st.setTermsTitleEn) ||
                  activeTitle ||
                  "-"
                : activeTitle || "-",
            legalPreviewVer: "v" + (activeVer || "2.4"),
            legalPreviewDate: activeDate || this.todayIso(),
            legalPreviewDpo: isPrivDoc ? st.setPrivDpo || "dpo@chargex.co.th" : "",
            legalPreviewReconsent: activeReconsent,
            legalPreviewSections: activePrevItems.map((x, idx) => ({
              h:
                curPrevLang === "en"
                  ? x.hEn || x.h || idx + 1 + ". Section"
                  : x.h || idx + 1 + ". หัวข้อ",
              p:
                curPrevLang === "en"
                  ? x.pEn || x.p || "-"
                  : x.p || "-",
            })),
          };
        })(),
        setPermPolicyRows: [
          [
            "allowViewWallet",
            "อนุญาตให้ดูและแก้ไข Wallet สมาชิก (Payments)",
            "ควบคุมการเข้าถึงยอดเงินสมาชิกและปุ่มปรับยอดกระเป๋าเงินในเมนูการชำระเงิน",
          ],
          [
            "allowExportReports",
            "อนุญาตให้ส่งออกข้อมูลรายงาน Excel / PDF",
            "อนุญาตให้ดาวน์โหลดไฟล์สรุปยอดขาย ประวัติการใช้ตู้ และตารางสถานีออกนอกระบบ",
          ],
          [
            "allowAccessLogs",
            "อนุญาตให้เข้าถึงบันทึกประวัติการเข้าใช้ระบบ (Access Logs)",
            "เปิดให้ Operator ตรวจสอบรายการกิจกรรมและความเคลื่อนไหวด้านความปลอดภัย",
          ],
          [
            "enforceCorpEmail",
            "บังคับบัญชี Operator เข้าด้วย @chargex.co.th เท่านั้น",
            "ป้องกันไม่ให้เพิ่มหรือแก้ไขอีเมลพนักงานนอกโดเมนองค์กรของบริษัท",
          ],
          [
            "allowSelfProfileEdit",
            "อนุญาตให้ผู้ใช้งานแก้ไขข้อมูลและภาพโปรไฟล์ตนเอง",
            "เปิดให้สมาชิกทีมปรับรูปประจำตัวและเปลี่ยนรหัสผ่านของตนเองในเมนู My Account",
          ],
        ].map(([key, label, desc]) => {
          const on = permPolicy[key] !== false;
          return {
            label,
            desc,
            on,
            statText: on ? "เปิดใช้งานสิทธิ์" : "ปิดสิทธิ์ชั่วคราว",
            btnStyle:
              "height: 28px; padding: 0 10px; border-radius: 999px; font-family: inherit; font-size: 12px; font-weight: 700; cursor: pointer; flex: none; " +
              (on
                ? "border: 0; background: #E7F6EE; color: #146C3E"
                : "border: 0; background: #FDECEC; color: #B42318"),
            switchWrapStyle:
              "width: 44px; height: 24px; border-radius: 999px; border: 0; padding: 2px; cursor: pointer; display: inline-flex; align-items: center; transition: all .15s; flex: none; " +
              (on
                ? "justify-content: flex-end; background: #146C3E"
                : d
                  ? "justify-content: flex-start; background: #3F3F46"
                  : "justify-content: flex-start; background: #D4D4D8"),
            switchKnobStyle:
              "width: 20px; height: 20px; border-radius: 999px; background: #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.22)",
            toggle: () => {
              if (!canView("settings")) {
                fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                return;
              }
              const nextP = Object.assign({}, permPolicy, { [key]: !on });
              this.saveStore("cx-bo-perm-policy", nextP);
              this.setState({ permPolicy: nextP });
              fireToast("อัปเดตนโยบายการเข้าถึงข้อมูลแล้ว");
            },
          };
        }),
        setMatrixRoleBtns: rolesList.map((r) => {
          const activeR =
            rolesList.find((x) => x.id === st.setMatrixRoleId) ||
            rolesList.find((x) => x.baseRole === "operator") ||
            rolesList[0];
          return {
            label: r.name,
            isLocked: r.baseRole === "super_admin",
            pick: () => this.setState({ setMatrixRoleId: r.id }),
            style: nwBtnStyle(activeR && activeR.id === r.id),
          };
        }),
        ...(() => {
          const activeR =
            rolesList.find((x) => x.id === st.setMatrixRoleId) ||
            rolesList.find((x) => x.baseRole === "operator") ||
            rolesList[0];
          const mSuper = !!(activeR && activeR.baseRole === "super_admin");
          const curMPerms = activeR
            ? mSuper
              ? permDefs.map((p) => p[0])
              : activeR.perms || []
            : [];
          const MOD_DESC = {
            dashboard: "ดู KPI รายได้ สถานีออนไลน์ และกราฟภาพรวม",
            operators: "จัดการบัญชีผู้ใช้ บทบาท ทีมงาน และสิทธิ์ระบบ",
            stations: "เพิ่ม แก้ไข ลบสถานี และเชื่อมโยงหัวชาร์จ",
            coupons: "สร้าง แก้ไข และควบคุมการใช้คูปองส่วนลด",
            news: "เผยแพร่ประกาศ ข่าวสาร และแบนเนอร์ในแอป",
            monitor: "ติดตามสถานะตู้ชาร์จแบบ Real-time และบำรุงรักษา",
            tutorial: "จัดการคู่มือแนะนำการใช้งานแอป 4 ขั้นตอน",
            payments: "ดูรายการธุรกรรม ใบกำกับ และจัดการ Wallet",
            reports: "เรียกดูรายงานวิเคราะห์และส่งออกข้อมูลระบบ",
            settings: "ตั้งค่าระบบ รหัสผ่าน ข้อกำหนดกฎหมาย และหมวดหมู่",
          };
          return {
            setMatrixActiveRoleLabel: activeR ? activeR.name : "-",
            setMatrixActiveRoleIsSuper: mSuper,
            setMatrixActiveRoleCountText:
              curMPerms.length + " / " + permDefs.length + " โมดูล",
            setMatrixPermBtns: permDefs.map(([k, label]) => {
              const on = curMPerms.indexOf(k) >= 0;
              const lv = mSuper
                ? "full"
                : (activeR &&
                    activeR.permLevels &&
                    activeR.permLevels[k]) ||
                  (on ? "edit" : "none");
              return {
                modId: k,
                label: (on ? "✓ " : "+ ") + label,
                modLabel: label,
                modDesc: MOD_DESC[k] || "ควบคุมสิทธิ์การเข้าถึงโมดูลนี้",
                on,
                isLocked: mSuper,
                levelLabel: mSuper
                  ? "Full Access (Locked)"
                  : on
                    ? lv === "view"
                      ? "View Only"
                      : lv === "full"
                        ? "Full Access"
                        : "Edit & Manage"
                    : "ไม่มีสิทธิ์ (No Access)",
                levelStyle:
                  "padding: 3px 9px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; " +
                  (mSuper
                    ? "background: #FFF1EB; color: #C42D00"
                    : on
                      ? "background: #E7F6EE; color: #146C3E"
                      : d
                        ? "background: #27272A; color: #9CA3AF"
                        : "background: #F4F4F4; color: #6B6B6B"),
                switchWrapStyle:
                  "width: 44px; height: 24px; border-radius: 999px; border: 0; padding: 2px; display: inline-flex; align-items: center; transition: all .15s; flex: none; " +
                  (mSuper
                    ? "justify-content: flex-end; background: #FC3901; opacity: 0.72; cursor: not-allowed"
                    : on
                      ? "justify-content: flex-end; background: #146C3E; cursor: pointer"
                      : d
                        ? "justify-content: flex-start; background: #3F3F46; cursor: pointer"
                        : "justify-content: flex-start; background: #D4D4D8; cursor: pointer"),
                switchKnobStyle:
                  "width: 20px; height: 20px; border-radius: 999px; background: #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.22)",
                pick: () => {
                  if (!canView("settings")) {
                    fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                    return;
                  }
                  if (!activeR || mSuper) {
                    fireToast("ไม่สามารถเปลี่ยนสิทธิ์ของบัญชี Super Admin หลักได้");
                    return;
                  }
                  let np = curMPerms.slice();
                  if (on) {
                    if (np.length <= 1) {
                      fireToast(
                        "กรุณาระบุชื่อบทบาท คำอธิบาย และเลือกสิทธิ์อย่างน้อย 1 สิทธิ์",
                      );
                      return;
                    }
                    np = np.filter((x) => x !== k);
                  } else {
                    np.push(k);
                  }
                  const nextLv = this.levelsFromPerms(
                    np,
                    false,
                    activeR.permLevels,
                  );
                  const nextR = rolesList.map((r) =>
                    r.id === activeR.id
                      ? Object.assign({}, r, { perms: np, permLevels: nextLv })
                      : r,
                  );
                  const nextU = st.users.map((u) =>
                    u.roleId === activeR.id
                      ? Object.assign({}, u, { perms: np.slice() })
                      : u,
                  );
                  this.saveStore("cx-bo-roles", nextR);
                  this.saveStore("cx-bo-users", nextU);
                  this.setState({ roles: nextR, users: nextU });
                  fireToast("อัปเดตสิทธิ์การเข้าถึงของ Role แล้ว");
                },
                style: nwBtnStyle(on),
              };
            }),
          };
        })(),
        setCatGroupFilters: [
          ["all", "ทุกหมวดหมู่"],
          ["news", "ข่าวสาร & แจ้งเตือน"],
          ["coupon", "คูปอง & สิทธิประโยชน์"],
          ["station", "สถานี & หัวชาร์จ"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ setCatGroupFilter: id }),
          style: dBtnStyle((st.setCatGroupFilter || "all") === id),
        })),
        setCatCountBadge:
          "หมวดหมู่ทั้งหมด " +
          categoriesList.filter(
            (c) =>
              (st.setCatGroupFilter || "all") === "all" ||
              c.group === st.setCatGroupFilter,
          ).length +
          " รายการ",
        setCatRows: categoriesList
          .filter(
            (c) =>
              (st.setCatGroupFilter || "all") === "all" ||
              c.group === st.setCatGroupFilter,
          )
          .map((c) => {
            const act = c.status === "active";
            const grpMeta = {
              news: ["ข่าวสาร & แจ้งเตือน", "ซิงค์หน้าข่าวสาร"],
              coupon: ["คูปอง & สิทธิประโยชน์", "ซิงค์หน้าคูปอง"],
              station: ["สถานี & หัวชาร์จ", "ซิงค์หน้าสถานี"],
            }[c.group] || ["ข่าวสาร & แจ้งเตือน", "ซิงค์หน้าข่าวสาร"];
            const usageCount =
              c.group === "news"
                ? (st.news || []).filter((n) => n.tag === c.name).length
                : c.group === "coupon"
                  ? (st.coupons || []).filter((cp) => cp.usageType === c.name)
                      .length
                  : 0;
            return {
              name: c.name,
              nameEn: c.nameEn || c.name,
              desc: c.desc || "-",
              isNews: c.group === "news",
              isCoupon: c.group === "coupon",
              isStation: c.group === "station",
              isActive: act,
              groupLabel: grpMeta[0],
              syncText: grpMeta[1],
              usageCount,
              usageText:
                usageCount > 0
                  ? "ใช้งาน " + usageCount + " รายการ"
                  : "ยังไม่ถูกใช้งาน",
              usageBadgeStyle:
                "display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 11.5px; font-weight: 700; white-space: nowrap; " +
                (usageCount > 0
                  ? d
                    ? "background: #27272A; color: #E4E4E7"
                    : "background: #F4F4F4; color: #3A3A3A"
                  : d
                    ? "background: transparent; color: #71717A"
                    : "background: transparent; color: #8A8A8A"),
              statText: act ? "เปิดใช้งาน" : "ปิดใช้งาน",
              statStyle:
                "display: inline-block; padding: 3px 9px; border-radius: 999px; font-size: 12px; font-weight: 700; white-space: nowrap; " +
                (act
                  ? "background: #E7F6EE; color: #146C3E"
                  : d
                    ? "background: #27272A; color: #9CA3AF"
                    : "background: #F6F6F6; color: #6B6B6B"),
              switchWrapStyle:
                "width: 40px; height: 22px; border-radius: 999px; border: 0; padding: 2px; cursor: pointer; display: inline-flex; align-items: center; transition: all .15s; flex: none; " +
                (act
                  ? "justify-content: flex-end; background: #146C3E"
                  : d
                    ? "justify-content: flex-start; background: #3F3F46"
                    : "justify-content: flex-start; background: #D4D4D8"),
              switchKnobStyle:
                "width: 18px; height: 18px; border-radius: 999px; background: #FFFFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.22)",
              toggleLabel: act ? "ปิดใช้งาน" : "เปิดใช้งาน",
              toggle: () => {
                if (!canView("settings")) {
                  fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                  return;
                }
                const next = categoriesList.map((x) =>
                  x.id === c.id
                    ? Object.assign({}, x, {
                        status: act ? "inactive" : "active",
                      })
                    : x,
                );
                this.saveStore("cx-bo-categories", next);
                this.setState({ categories: next });
                fireToast("อัปเดตสถานะหมวดหมู่แล้ว");
              },
              edit: () => {
                if (!canView("settings")) {
                  fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                  return;
                }
                this.setState({
                  modal: "cat",
                  modalErr: "",
                  catEditId: c.id,
                  catGroup: c.group || "news",
                  catName: c.name || "",
                  catNameEn: c.nameEn || "",
                  catDesc: c.desc || "",
                  catStat: act ? "active" : "inactive",
                });
              },
              del: () => {
                if (!canView("settings")) {
                  fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
                  return;
                }
                if (usageCount > 0) {
                  fireToast(
                    "ไม่สามารถลบหมวดหมู่ที่กำลังใช้งานอยู่ได้ (" +
                      usageCount +
                      " รายการ) กรุณาปิดใช้งานชั่วคราวแทน",
                  );
                  return;
                }
                const idx = categoriesList.findIndex((x) => x.id === c.id);
                const removed = categoriesList[idx] || c;
                const next = categoriesList.filter((x) => x.id !== c.id);
                this.saveStore("cx-bo-categories", next);
                this.setState({
                  categories: next,
                  catUndo: removed,
                  catUndoIdx: idx < 0 ? 0 : idx,
                  nwUndo: null,
                  tutUndo: null,
                  cpUndo: null,
                  stUndo: null,
                  umUndo: null,
                });
                fireToast("ลบหมวดหมู่แล้ว", true);
              },
            };
          }),
        noSetCats:
          categoriesList.filter(
            (c) =>
              (st.setCatGroupFilter || "all") === "all" ||
              c.group === st.setCatGroupFilter,
          ).length === 0,
        openAddCat: () => {
          if (!canView("settings")) {
            fireToast("สิทธิ์การเข้าถึงจำกัดเฉพาะ Super Admin");
            return;
          }
          const g =
            st.setCatGroupFilter && st.setCatGroupFilter !== "all"
              ? st.setCatGroupFilter
              : "news";
          this.setState({
            modal: "cat",
            modalErr: "",
            catEditId: "",
            catGroup: g,
            catName: "",
            catNameEn: "",
            catDesc: "",
            catStat: "active",
          });
        },
        showCatModal: canView("settings") && st.modal === "cat",
        catModalTitle: st.catEditId ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่",
        catGroupBtns: [
          ["news", "ข่าวสาร & แจ้งเตือน"],
          ["coupon", "คูปอง & สิทธิประโยชน์"],
          ["station", "สถานี & หัวชาร์จ"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ catGroup: id, modalErr: "" }),
          style: nwBtnStyle((st.catGroup || "news") === id),
        })),
        catName: st.catName,
        onCatName: setVal("catName"),
        catNameEn: st.catNameEn,
        onCatNameEn: setVal("catNameEn"),
        catDesc: st.catDesc,
        onCatDesc: setVal("catDesc"),
        catStatBtns: [
          ["active", "เปิดใช้งาน"],
          ["inactive", "ปิดใช้งาน"],
        ].map(([id, label]) => ({
          label,
          pick: () => this.setState({ catStat: id, modalErr: "" }),
          style: nwBtnStyle((st.catStat || "active") === id),
        })),
        saveCat: () => {
          if (!canView("settings")) return;
          const nm = String(st.catName || "").trim();
          const nmEn = String(st.catNameEn || "").trim() || nm;
          const ds = String(st.catDesc || "").trim();
          const grp = st.catGroup || "news";
          const stat = st.catStat === "inactive" ? "inactive" : "active";
          if (!nm) {
            this.setState({ modalErr: "กรุณากรอกชื่อหมวดหมู่" });
            return;
          }
          if (
            categoriesList.some(
              (x) =>
                x.group === grp &&
                x.name.toLowerCase() === nm.toLowerCase() &&
                x.id !== st.catEditId,
            )
          ) {
            this.setState({ modalErr: "หมวดหมู่นี้มีในกลุ่มนี้อยู่แล้ว" });
            return;
          }
          const isEdit = !!st.catEditId;
          const next = isEdit
            ? categoriesList.map((x) =>
                x.id === st.catEditId
                  ? Object.assign({}, x, {
                      group: grp,
                      name: nm,
                      nameEn: nmEn,
                      desc: ds,
                      status: stat,
                    })
                  : x,
              )
            : categoriesList.concat([
                {
                  id: "cat_" + Date.now(),
                  group: grp,
                  name: nm,
                  nameEn: nmEn,
                  desc: ds || nm,
                  status: stat,
                },
              ]);
          this.saveStore("cx-bo-categories", next);
          this.setState({
            categories: next,
            modal: "",
            catEditId: "",
            modalErr: "",
          });
          fireToast(
            isEdit
              ? "บันทึกการแก้ไขหมวดหมู่แล้ว"
              : "เพิ่มหมวดหมู่เรียบร้อยแล้ว",
          );
        },
        topSearch: st.topSearch || "",
        hasTopSearch: !!String(st.topSearch || "").trim(),
        onTopSearch: (e) => applyTopSearch(e && e.target ? e.target.value : ""),
        clearTopSearch: () => applyTopSearch(""),
        goTabDash: () => {
          clearInterval(this._tutT);
          this.setState({
            tab: allowedTabs[0] || "dashboard",
            modal: "",
            modalErr: "",
            tutAutoPlay: false,
            langMenuOpen: false,
          });
        },
        goTabStations: () => {
          if (canView("stations")) {
            clearInterval(this._tutT);
            this.setState({
              tab: "stations",
              modal: "",
              modalErr: "",
              tutAutoPlay: false,
              langMenuOpen: false,
            });
          }
        },
        goTabNews: () => {
          if (canView("news")) {
            clearInterval(this._tutT);
            this.setState({
              tab: "news",
              modal: "",
              modalErr: "",
              tutAutoPlay: false,
              langMenuOpen: false,
            });
          }
        },
        newsUnreadBadge: String(
          st.news.filter((n) => n.status === "published").length,
        ),
        dashGreeting: "สวัสดี, " + (dispName || "Admin") + "!",
        dashHeroSub:
          "ออนไลน์ " +
          dash.stOnline +
          " / " +
          dash.stations.length +
          " สถานี · " +
          dash.members.length +
          " สมาชิก · ยอดค้าง ฿" +
          this.fmtNum(dash.failedSum, 2),
        dPerfHeadline:
          dash.metric === "sessions"
            ? this.fmtNum(dash.totSess) + " ครั้ง"
            : dash.metric === "kwh"
              ? this.fmtNum(dash.totKwh, 1) + " kWh"
              : "฿" + this.fmtNum(dash.totRev, 0),
        dashRingCards: [
          [
            "สถานีออนไลน์",
            Math.round(
              (dash.stOnline / Math.max(1, dash.stations.length)) * 100,
            ),
            "ออนไลน์ " + dash.stOnline,
            "#146C3E",
          ],
          [
            "สถานีพร้อมให้บริการ",
            Math.round(
              ((dash.stOnline + dash.stChg) /
                Math.max(1, dash.stations.length)) *
                100,
            ),
            "กำลังชาร์จ " + dash.stChg,
            accent,
          ],
          [
            "สมาชิกใช้งานช่วงนี้",
            Math.round(
              (dash.activeMembersInPeriod / Math.max(1, dash.members.length)) *
                100,
            ),
            "ใช้งานช่วงนี้ " + dash.activeMembersInPeriod + " คน",
            "#FC3901",
          ],
        ]
          .concat(
            dash.stations
              .slice(0, 3)
              .map((s, idx) => [
                s.name,
                Math.max(
                  5,
                  Math.min(
                    100,
                    Math.round((s.kwh / Math.max(1, dash.totKwh)) * 100),
                  ),
                ),
                this.fmtNum(s.kwh, 1) + " kWh",
                idx === 0 ? accent : idx === 1 ? "#146C3E" : "#B86A00",
              ]),
          )
          .map(([label, pct, subText, ringStroke]) => {
            const clamp = Math.max(0, Math.min(100, pct));
            const filled = (clamp / 100) * 138.2;
            return {
              label,
              subText,
              ringStroke,
              pctText: clamp + "%",
              dashArr: filled.toFixed(1) + " 138.2",
            };
          }),
        dashLinkedRows: dash.members.slice(0, 4).map((m) => {
          const debt = m.uncollected > 0;
          const nmDisp = en ? txx(m.name) : m.name;
          return {
            initial: (
              String(nmDisp || "M")
                .trim()
                .slice(0, 1) || "M"
            ).toUpperCase(),
            name: m.name,
            sub: m.car,
            roleText: m.userRole || "ผู้ใช้ทั่วไป",
            walletText: "฿" + this.fmtNum(m.wallet, 0),
            statText: debt ? "ค้างตัดชำระ" : "ใช้งานปกติ",
            statStyle:
              "padding: 3px 9px; border-radius: 999px; font-size: 13.5px; font-weight: 700; " +
              (debt
                ? "background: #FDECEC; color: #B42318"
                : "background: #E7F6EE; color: #146C3E"),
          };
        }),
        dashEventRows: st.news.slice(0, 3).map((n) => {
          const pub = n.status === "published";
          return {
            title: n.title || "",
            meta: (n.tag || "ข่าวสาร") + " · " + (n.date || "วันนี้"),
            tag: pub ? "เผยแพร่" : "ฉบับร่าง",
            tagStyle:
              "padding: 3px 9px; border-radius: 999px; font-size: 13.5px; font-weight: 700; flex: none; " +
              (pub
                ? "background: #FFF1EB; color: #C42D00"
                : "background: #FFF4E0; color: #B86A00"),
            open: () => {
              if (canView("news")) {
                clearInterval(this._tutT);
                this.setState({
                  tab: "news",
                  modal: "",
                  modalErr: "",
                  tutAutoPlay: false,
                });
              }
            },
          };
        }),
        undoDel,
        undoDelNews: undoDel,
        showToast: !!st.toast,
        toastText: st.toast || "",
      };
    },
  };
})();
