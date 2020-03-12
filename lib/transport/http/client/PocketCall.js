/*
 * Copyright 2018 ICON Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Response from '../../jsonrpc/Response';
import { RpcError } from '../../../Exception';

/**
 * Class that forwards requests through the Pocket Network relay function.
 */
export default class PocketCall {
	/**
	 * Creates an Icon SDK compatible function to relay HTTP calls
	 * @param {string} httpRequest - URL and body for relaying
     * @param {function} converter - JSON converter function if required
     * @param {function} relay - the relay function passed from the root application
     * @param {pocketAAT} pocketAAT - the Pocket Network Application Auth Token
     *
	 */
	constructor(httpRequest, converter, relay, pocketAAT) {
		this.httpRequest = httpRequest;
		this.converter = converter;
		this.relay = relay;
		this.pocketAAT = pocketAAT;
	}

	execute() {
		return this.callAsync();
	}

	async callAsync() {
		try {
			const response = await this.relay(
				this.httpRequest.url,
				this.httpRequest.body,
				this.pocketAAT,
			);
			return (new Response(response, this.converter)).result;
		} catch (e) {
			if (typeof e.error === 'object') {
				const rpcError = new RpcError(e.error.message);
				throw rpcError.toString();
			} else {
				throw e;
			}
		}
	}
}
