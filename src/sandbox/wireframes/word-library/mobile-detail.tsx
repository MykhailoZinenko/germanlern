/**
 * @screen word-library/mobile-detail
 * @shell MobileShell active=library, contentScroll=true
 * @add-ref ADD.md §12 · Word Library » Mobile » Detail
 *
 * Full-page word detail. Topbar: back chevron + "Word" title. No right actions.
 */
import { C, SZ } from "../_shared/tokens";
import { Btn, Icon } from "../_shared/primitives";
import { MobileShell, MobileTopbar } from "../_shared/shells";
import { WordDetail } from "./_word-detail";
import { WORDS } from "./_data";

export function WLMobileDetail() {
  const w = WORDS[0];
  return (
    <MobileShell
      active="library"
      topbar={
        <MobileTopbar
          left={
            <Btn variant="ghost" style={{ width: SZ.btnMd, height: SZ.btnMd, padding: 0 }}>
              <Icon name="chevLeft" size={SZ.iconMd} color={C.text.secondary} />
            </Btn>
          }
          title="Word"
        />
      }
    >
      <WordDetail w={w} scope="mobile" />
    </MobileShell>
  );
}
