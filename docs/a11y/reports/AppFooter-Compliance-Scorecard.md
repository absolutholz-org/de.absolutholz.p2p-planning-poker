# AppFooter Compliance Scorecard

This report summarizes the WCAG 2.2 AA accessibility compliance for the `AppFooter` component, based on automated audits using the Axe-core engine.

## 📊 Compliance Summary

| WCAG Success Criteria            | Axe Rule ID            | Status  | Context                                                                                              |
| -------------------------------- | ---------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| **1.3.1 Info and Relationships** | `region`               | ✅ PASS | The `<section>` is correctly promoted to a landmark region via `aria-labelledby`.                    |
| **2.4.4 Link Purpose**           | `link-name`            | ✅ PASS | All legal and project links have discernible, translated text.                                       |
| **4.1.2 Name, Role, Value**      | `landmark-is-unique`   | ✅ PASS | Both `<nav>` groups are uniquely labeled (`legal` vs `project`), satisfying structural requirements. |
| **4.1.2 Name, Role, Value**      | `aria-prohibited-attr` | ❌ FAIL | `aria-label` is used on a `<span>` without a valid ARIA role (Copyright section).                    |

## 🔍 Detailed Observations

### Landmarks & Navigation

The component uses semantic HTML5 landmarks efficiently. The two `<nav>` groups are explicitly labeled using `aria-label`, ensuring that screen reader users can distinguish between legal links and project-related links. This directly satisfies **WCAG 4.1.2**.

### Dynamic Content

The `<time>` tag correctly represents the build year. While the tag itself is accessible, the surrounding `<span>` uses an `aria-label` which Axe identifies as poorly supported on non-interactive elements without a role.

### Recommendations

> [!IMPORTANT]
> To resolve the `aria-prohibited-attr` failure, consider adding `role="text"` or `role="img"` to the copyright `<span>`, or simply remove the `aria-label` and rely on the visible text content which is already descriptive.

---

_Report generated on 2026-03-26 via automated Vitest/Axe pipeline._
