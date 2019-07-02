/********************************************************************************
 * Copyright (C) 2019 Red Hat, Inc. and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import { KeybindingContext, ApplicationShell } from '@theia/core/lib/browser';
import { injectable, inject } from 'inversify';
import { TerminalSearchWidgetFactory } from './terminal-search-widget';
import { TerminalWidgetImpl } from '../terminal-widget-impl';

export namespace TerminalSearchKeybindingContext {
    export const disableSearch = 'hideSearch';
}

@injectable()
export class TerminalSearchDisableContext implements KeybindingContext {
    readonly id: string = TerminalSearchKeybindingContext.disableSearch;

    @inject(ApplicationShell)
    protected readonly shell: ApplicationShell;

    @inject(TerminalSearchWidgetFactory)
    protected terminalSearchWidgetFactory: TerminalSearchWidgetFactory;

    isEnabled(): boolean {
        if (!(this.shell.activeWidget instanceof TerminalWidgetImpl)) {
            return false;
        }
        const terminal = (this.shell.activeWidget as TerminalWidgetImpl);
        const searchWidget = this.terminalSearchWidgetFactory(terminal.getTerminal(), terminal.node, terminal.id);
        return searchWidget.isActivated();
    }
}