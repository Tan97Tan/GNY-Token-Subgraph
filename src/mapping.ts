import { BigInt } from "@graphprotocol/graph-ts"
import {
  GNYerc20Token,
  Approval,
  Transfer
} from "../generated/GNYerc20Token/GNYerc20Token"
import { Approval_, Transfer_ } from "../generated/schema"

export function handleApproval(event: Approval): void {
  let entity = Approval_.load(event.params._owner.toHex())

  if (entity == null) {
    entity = new Approval_(event.params._owner.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity._owner = event.params._owner
  entity._spender = event.params._spender
  entity._value = event.params._value
  entity.save()
}

export function handleTransfer(event: Transfer): void {
  let entity = Transfer_.load(event.params._from.toHex())

  if (entity == null) {
    entity = new Transfer_(event.params._from.toHex())
    entity.count = BigInt.fromI32(0)
  }

  entity.count = entity.count + BigInt.fromI32(1)
  entity._from = event.params._from
  entity._to = event.params._to
  entity._value = event.params._value
  entity.save()
}
