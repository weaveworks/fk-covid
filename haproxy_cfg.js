import * as param from '@jkcfg/std/param'
import * as std from '@jkcfg/std'

const config = param.all();
let output = [];

const servers = (config) => {
  if (config.machines !== undefined) {
    let result = [];
    for (let i = 0; i < config.controlPlane.nodes; i++ ) {
      let machine = config.machines[i];
      let ip = machine.runtimeNetworks[0].ip;
      result.push(`  server node${i} ${ip}:6443 check`);
    }
    return result.join("\n")
  }
}

const haproxy = `
frontend k8s-api
  bind *:6443
  mode tcp
  option tcplog
  default_backend k8s-api

backend k8s-api
  mode tcp
  option tcplog
  option tcp-check
  balance roundrobin
  default-server inter 10s downinter 5s rise 2 fall 2 slowstart 60s maxconn 250 maxqueue 256 weight 100
${servers(config)}`

output.push({ path: 'haproxy.cfg', value: haproxy,  format: std.Format.RAW });

export default output;