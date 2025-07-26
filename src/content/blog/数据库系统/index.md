---
title: 数据库系统
description: 'Write your description here.'
publishDate: 2024-11-17 16:05:11
tags:
  - System
  - Technology
---


## 概述

### CAP 定理

在分布式系统中，不可能同时满足一致性（Consistency），可用性（Availability）和分区容错性（Partition tolerance），最多只能同时做到两个。



- Consistency（一致性）：在分布式系统中的所有数据备份，在同一时刻是否同样的值。
- Availability（可用性）：在集群中任意节点故障时，仍然可以提供服务。
- Partition tolerance（分区容错性）：分布式系统在遇到网络分区故障时，仍然能够继续运行。


### BASE 理论

BASE 理论是对 CAP 理论的一种扩展，是 NoSQL 数据库通常选择的理论。

- Basically Available（基本可用）：不保证一致性，但保证可用性。
- Soft state（软状态）：允许系统中的数据存在中间状态，并不保证数据的强一致性。
- Eventually consistent（最终一致性）：系统中的数据经过一段时间的同步后，最终达到一致的状态。



### 典型问题

- 幂等性（Idempotence）某个操作可以执行多次，但执行的效果与执行一次是相同的。
- 互斥性（Mutual Exclusion）主要涉及在多个进程或线程并发执行时，对于共享资源的访问控制。互斥性确保在同一时刻只有一个进程能够访问共享资源，从而避免由于并发操作而导致的数据不一致或资源冲突。

