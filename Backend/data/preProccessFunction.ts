import { AnyRule, CompositeRule, RuleLiteral } from "../src/type/typeRule"



export class PreProccessJson {

	public constructor() {
	}

	createRulesFromOffers(offers, rules) {
		for(let offer of offers){
			rules.push(offer.rule as RuleLiteral);
		}
	}

	createAndPushRule(rule, rules, index) {
		const newRule = {
			...rule,
			code: "codigoAleatorio" + index
		}
		rules.push(newRule)
		return newRule
	}

	filterJson(rulesToFilter, offersToFilter, untypeOffers) {

	for (let rule of rulesToFilter) {
		let newRule  = rule as CompositeRule
		let i = 0
		if (newRule.rules) {
			for (let rule of (newRule.rules as AnyRule[])) {
				if (typeof rule == "string") {
				} else {

					this.createAndPushRule(rule, rulesToFilter, i)
					newRule.rules[i] = "codigoAleatorio" + i
				}
				i += 1
			}
		}
	}


	this.createRulesFromOffers(offersToFilter, rulesToFilter)


	untypeOffers.offers.forEach(offer => {
		if (typeof offer.rule != "string") {

			(offer.rule as any).rules.forEach((rule1, index1) => {
				if(typeof rule1 !== "string"){
					let i = 0
					if ((rule1 as any).rules) {
						for(let r of (rule1 as any).rules) {
							if(typeof r !== "string"){
		
								const a = this.createAndPushRule(r, rulesToFilter,i);
								(rule1 as any).rules[i] = a.code;
							}
							i +=1
						}
					} else {
						const a = {
							...rule1,
							code: rule1.description + index1
						} as RuleLiteral
						
						rulesToFilter.push(a);
						//const a = this.createAndPushRule(rule1, rulesToFilter, index1);
						(offer.rule as unknown as CompositeRule).rules[index1] = a.code;
						return
					}
					if (typeof offer.rule != "string") {

						(offer.rule as any).rules[index1] = (rule1 as any).code;
					} 			
					const ruleToPush = rule1 as RuleLiteral
					rulesToFilter.push(ruleToPush);
				}
			});
		}
	});
}


}
