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

import HttpRequest from './client/HttpRequest';
import PocketCall from './client/PocketCall';

/**
 * Class supplementing the HTTP provider with the Pocket Network
 * of decentralized nodes.
 *
 * See: https://docs.pokt.network/docs/what-is-pocket-network
 */
export default class PocketProvider {
	/**
	 * Creates an instance of HttpProvider wrapped by the Pocket Network.
	 * @param {string} url - a dummy URL to keep consistency with ICON SDK configurations
     * @param {function} relay - the relay function
     * @param {pocketAAT} pocketAAT - the Application Auth Token
	 * See: https://github.com/pokt-network/pocket-aat-js
     *
	 */
	constructor(url, relay, pocketAAT) {
		this.url = url;
		this.relay = relay;
		this.pocketAAT = pocketAAT;
	}

	request(request, converter) {
		const body = JSON.stringify(request, (key, value) => {
			if (value) {
				return value;
			}

			return undefined;
		});
		const httpRequest = new HttpRequest(this.url, body);
		return new PocketCall(httpRequest, converter, this.relay, this.pocketAAT);
	}
}
