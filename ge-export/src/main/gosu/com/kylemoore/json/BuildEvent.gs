package com.kylemoore.json

/**
 * Handmade by Kyle
 * name: BuildEvent
 *
 */
structure BuildEvent {

  property get timestamp(): Long
  property get data(): Dynamic
  property get type(): type

  structure type {
    property get eventType(): String
    property get majorVersion(): Integer
    property get minorVersion(): Integer
  }
}
